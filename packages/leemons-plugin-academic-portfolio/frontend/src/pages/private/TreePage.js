import React, { useEffect, useMemo } from 'react';
import {
  Box,
  Col,
  ContextContainer,
  Grid,
  PageContainer,
  Paper,
  Tree,
} from '@bubbles-ui/components';
import { useLayout } from '@layout/context';
import { AddCircleIcon, DuplicateIcon } from '@bubbles-ui/icons/outline';
import { AdminPageHeader } from '@bubbles-ui/leemons';
import { SelectCenter } from '@users/components/SelectCenter';
import useTranslateLoader from '@multilanguage/useTranslateLoader';
import prefixPN from '@academic-portfolio/helpers/prefixPN';
import { useQuery, useStore } from '@common';
import { cloneDeep, find, forEach, isArray, isUndefined, map, omitBy } from 'lodash';
import { addErrorAlert, addSuccessAlert } from '@layout/alert';
import useRequestErrorMessage from '@common/useRequestErrorMessage';
import SelectUserAgent from '@users/components/SelectUserAgent';
import SelectProgram from '../../components/Selectors/SelectProgram';
import {
  addStudentsToClassesUnderNodeTreeRequest,
  createClassRequest,
  createGroupRequest,
  createKnowledgeRequest,
  createSubjectRequest,
  createSubjectTypeRequest,
  detailProgramRequest,
  duplicateGroupRequest,
  getProfilesRequest,
  getProgramTreeRequest,
  listSubjectCreditsForProgramRequest,
  removeClassRequest,
  removeGroupFromClassesRequest,
  removeStudentFromClassRequest,
  updateClassRequest,
  updateCourseRequest,
  updateGroupRequest,
  updateKnowledgeRequest,
  updateProgramRequest,
  updateSubjectRequest,
  updateSubjectTypeRequest,
} from '../../request';
import { TreeProgramDetail } from '../../components/Tree/TreeProgramDetail';
import { getTreeProgramDetailTranslation } from '../../helpers/getTreeProgramDetailTranslation';
import { getTreeCourseDetailTranslation } from '../../helpers/getTreeCourseDetailTranslation';
import { TreeCourseDetail } from '../../components/Tree/TreeCourseDetail';
import { TreeGroupDetail } from '../../components/Tree/TreeGroupDetail';
import { getTreeGroupDetailTranslation } from '../../helpers/getTreeGroupDetailTranslation';
import { TreeSubjectTypeDetail } from '../../components/Tree/TreeSubjectTypeDetail';
import { getTreeSubjectTypeDetailTranslation } from '../../helpers/getTreeSubjectTypeDetailTranslation';
import { getTreeKnowledgeDetailTranslation } from '../../helpers/getTreeKnowledgeDetailTranslation';
import { TreeKnowledgeDetail } from '../../components/Tree/TreeKnowledgeDetail';
import { TreeClassDetail } from '../../components/Tree/TreeClassDetail';
import { getTreeClassDetailTranslation } from '../../helpers/getTreeClassDetailTranslation';
import SelectSubjectsByTable from '../../components/Selectors/SelectSubjectsByTable';
import { getSubjectsTranslation } from '../../helpers/getSubjectsTranslation';
import { getTableActionsTranslation } from '../../helpers/getTableActionsTranslation';
import { TreeNewSubjectDetail } from '../../components/Tree/TreeNewSubjectDetail';
import { getTreeAddUsersComponentTranslation } from '../../helpers/getTreeAddUsersComponentTranslation';
import getCourseName from '../../helpers/getCourseName';

export default function TreePage() {
  const [t, , , tLoading] = useTranslateLoader(prefixPN('tree_page'));
  const [ts, , , tsLoading] = useTranslateLoader(prefixPN('subject_page'));
  const [, , , getErrorMessage] = useRequestErrorMessage();
  const [store, render] = useStore();
  const { openDeleteConfirmationModal, setLoading } = useLayout();

  const params = useQuery();

  function getTreeItemByTreeId(treeId) {
    const item = find(store.tree, { id: treeId });
    if (item) return item.item;
    return null;
  }

  function setAgainActiveTree() {
    let key = null;
    if (store.editingItem) key = 'editingItem';
    if (store.newItem) key = 'newItem';
    if (store.duplicateItem) key = 'duplicateItem';
    if (key) {
      const treeItem = getTreeItemByTreeId(store[key].treeId);
      if (treeItem) store[key] = treeItem;
    }
  }

  async function onEdit(item) {
    store.newItem = null;
    store.duplicateItem = null;
    store.editingItem = item;
    render();
  }

  async function onDuplicate(item) {
    store.newItem = null;
    store.editingItem = null;
    store.duplicateItem = item;
    render();
  }

  async function onRemove(item) {
    openDeleteConfirmationModal({
      onConfirm: async () => {
        try {
          if (item.nodeType === 'groups') {
            await removeGroupFromClassesRequest(item.value.id);
          }
          if (item.nodeType === 'class') {
            await removeClassRequest(item.value.id);
          }

          // eslint-disable-next-line no-use-before-define
          store.tree = await getProgramTree();
          setAgainActiveTree();
          addSuccessAlert(t(`${item.nodeType}Removed`));
        } catch (err) {
          addErrorAlert(getErrorMessage(err));
        }
        render();
      },
    })();
  }

  async function onNew(item) {
    store.editingItem = null;
    store.duplicateItem = null;
    store.newItem = item;
    render();
  }

  async function onNewSubject(item) {
    store.editingItem = null;
    store.duplicateItem = null;
    store.newItem = { ...item, nodeType: 'subject' };
    render();
  }

  const getProgramTree = async () => {
    setLoading(true);
    try {
      const [{ tree }, { subjectCredits }, { program }, { profiles }] = await Promise.all([
        getProgramTreeRequest(store.programId),
        listSubjectCreditsForProgramRequest(store.programId),
        detailProgramRequest(store.programId),
        getProfilesRequest(),
      ]);

      const classesBySubject = {};
      const result = [];

      const editLabel = t('treeEdit');
      const removeLabel = t('treeRemove');
      const duplicateLabel = t('treeDuplicate');

      // eslint-disable-next-line no-inner-declarations
      function processItem(item, parents) {
        let text = item.value.name;
        if (item.nodeType === 'courses') {
          text = getCourseName(item.value);
        }
        if (item.nodeType === 'class') {
          const classSubjectCredits = find(subjectCredits, {
            subject: item.value.subject.id,
          });
          const course = find(parents, { nodeType: 'courses' });
          const groups = find(parents, { nodeType: 'groups' });
          const courseName = course ? course.value.index : '';
          const substageName = item.value.substages
            ? ` - ${item.value.substages.abbreviation}`
            : '';
          let groupName = '';
          if (!groups) {
            groupName = item.value.groups ? ` - ${item.value.groups.abbreviation}` : '';
          }
          text = `${courseName}${classSubjectCredits?.internalId} ${item.value.subject.name}${groupName}${substageName}`;
          if (!isArray(classesBySubject[item.value.subject?.id]))
            classesBySubject[item.value.subject?.id] = [];
          classesBySubject[item.value.subject?.id].push({
            ...item.value,
            treeName: text,
            treeId: item.treeId,
          });
        }

        const actions = [
          {
            name: 'edit',
            tooltip: editLabel,
            showOnHover: true,
            handler: () => onEdit({ ...item }),
          },
        ];

        if (item.nodeType === 'groups' || item.nodeType === 'class') {
          actions.push({
            name: 'delete',
            tooltip: removeLabel,
            showOnHover: true,
            handler: () => onRemove({ ...item, parents }),
          });
        }

        if (item.nodeType === 'groups') {
          actions.push({
            name: 'duplicate',
            tooltip: duplicateLabel,
            showOnHover: true,
            icon: () => <DuplicateIcon />,
            handler: () => onDuplicate({ ...item, parents }),
          });
        }

        if (item.nodeType === 'class') {
          actions.push({
            name: 'add-subject',
            tooltip: t('newsubject'),
            showOnHover: true,
            icon: () => <AddCircleIcon />,
            handler: () => onNewSubject({ ...item, parents }),
          });
        }

        if (item.nodeType !== 'program' && item.nodeType !== 'courses') {
          actions.push({
            name: 'new',
            tooltip: t(`new${item.nodeType}`),
            showOnHover: true,
            icon: () => <AddCircleIcon />,
            handler: () => onNew({ ...item, parents }),
          });
        }

        result.push({
          id: item.treeId,
          parent: parents[parents.length - 1]?.treeId || 0,
          text,
          actions,
          item,
        });
        if (item.childrens && item.childrens.length) {
          item.childrens.forEach((child) => processItem(child, [...parents, item]));
        }
      }

      processItem(tree, []);
      store.profiles = profiles;
      store.program = program;
      store.classesBySubject = classesBySubject;
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      console.log(err);
      addErrorAlert(getErrorMessage(err));
      return false;
    }
  };

  async function init() {
    store.centerId = params.center;
    store.programId = params.program;
    if (store.centerId && store.programId) {
      store.tree = await getProgramTree();
    }
    render();
  }

  const messages = useMemo(
    () => ({
      header: {
        title: t('page_title'),
        description: t('page_description'),
      },
      addUsers: getTreeAddUsersComponentTranslation(t),
      treeProgram: getTreeProgramDetailTranslation(t),
      treeCourse: getTreeCourseDetailTranslation(t),
      treeGroup: getTreeGroupDetailTranslation(t),
      treeSubjectType: getTreeSubjectTypeDetailTranslation(t),
      treeKnowledge: getTreeKnowledgeDetailTranslation(t),
      treeClass: getTreeClassDetailTranslation(t),
      subjects: getSubjectsTranslation(ts),
      tableLabels: getTableActionsTranslation(ts),
    }),
    [t, ts]
  );

  function onSelectCenter(centerId) {
    store.centerId = centerId;
    render();
  }

  async function onSelectProgram(programId) {
    store.programId = programId;
    store.tree = await getProgramTree();
    render();
  }

  useEffect(() => {
    if (!tLoading && !tsLoading) init();
  }, [params, tLoading, tsLoading]);

  async function addStudentIfNeed(students, id, nodeType) {
    if (students) {
      await addStudentsToClassesUnderNodeTreeRequest({
        program: store.programId,
        nodeType,
        nodeId: store.editingItem.treeId,
        students,
      });
    }
  }

  async function onSaveProgram({ id, name, abbreviation, credits, students }) {
    try {
      store.saving = true;
      render();
      await updateProgramRequest({ id, name, abbreviation, credits });
      await addStudentIfNeed(students, id, 'program');
      store.tree = await getProgramTree();
      setAgainActiveTree();
      addSuccessAlert(t('programUpdated'));
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
    }
    store.saving = false;
    render();
  }

  async function onSaveCourse({ id, name, credits, students }) {
    try {
      store.saving = true;
      render();
      await updateCourseRequest({ id, name, abbreviation: name, number: credits });
      await addStudentIfNeed(students, id, 'courses');
      store.tree = await getProgramTree();
      setAgainActiveTree();
      addSuccessAlert(t('courseUpdated'));
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
    }
    store.saving = false;
    render();
  }

  async function onSaveGroup({ id, name, abbreviation, students }) {
    try {
      store.saving = true;
      render();
      await updateGroupRequest({ id, name, abbreviation });
      await addStudentIfNeed(students, id, 'groups');

      store.tree = await getProgramTree();
      setAgainActiveTree();
      addSuccessAlert(t('groupUpdated'));
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
    }
    store.saving = false;
    render();
  }

  async function onSaveSubjectType({
    students,
    id,
    name,
    groupVisibility,
    credits_course,
    credits_program,
  }) {
    try {
      store.saving = true;
      render();
      await updateSubjectTypeRequest({
        id,
        name,
        groupVisibility: !!groupVisibility,
        credits_course,
        credits_program,
      });
      await addStudentIfNeed(students, id, 'subjectType');
      store.tree = await getProgramTree();
      setAgainActiveTree();
      addSuccessAlert(t('subjectTypeUpdated'));
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
    }
    store.saving = false;
    render();
  }

  async function onSaveKnowledge({
    id,
    name,
    abbreviation,
    color,
    credits_course,
    credits_program,
    students,
  }) {
    try {
      store.saving = true;
      render();
      await updateKnowledgeRequest({
        id,
        name,
        abbreviation,
        color,
        credits_course,
        credits_program,
        icon: ' ',
      });
      await addStudentIfNeed(students, id, 'knowledges');
      store.tree = await getProgramTree();
      setAgainActiveTree();
      addSuccessAlert(t('knowledgeUpdated'));
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
    }
    store.saving = false;
    render();
  }

  async function onSaveSubject({ id, name, subjectType, knowledge, image, icon }) {
    try {
      store.saving = true;
      render();
      const body = {
        id,
        name,
        subjectType,
        image,
        icon,
      };
      if (!isUndefined(knowledge)) body.knowledge = knowledge;
      await updateSubjectRequest(body);
      store.tree = await getProgramTree();
      setAgainActiveTree();
      addSuccessAlert(t('subjectUpdated'));
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
    }
    store.saving = false;
    render();
  }

  function selectClass(classId) {
    const item = cloneDeep(store.editingItem || store.newItem);
    item.value = find(store.classesBySubject[item.value.subject?.id], {
      id: classId,
    });
    item.treeId = item.value.treeId;
    render();
  }

  async function onSaveClass({ schedule, teacher, associateTeachers, ...data }) {
    try {
      store.saving = true;
      render();
      let alert = null;
      const teachers = [];
      if (teacher) {
        teachers.push({ type: 'main-teacher', teacher });
      }
      if (associateTeachers) {
        forEach(associateTeachers, (tea) => {
          teachers.push({ type: 'associate-teacher', teacher: tea });
        });
      }
      if (data.id) {
        await updateClassRequest({
          ...data,
          teachers,
          schedule: schedule ? schedule.days : [],
        });
        alert = ts('classUpdated');
      } else {
        const {
          class: { id },
        } = await createClassRequest({
          ...omitBy(data, isUndefined),
          teachers,
          schedule: schedule ? schedule.days : [],
          subject: store.newItem.value.subject?.id,
          program: store.program.id,
        });
        // eslint-disable-next-line no-param-reassign
        data.id = id;
        store.editingItem = { ...store.newItem };
        store.newItem = null;
        alert = ts('classCreated');
      }
      store.tree = await getProgramTree();
      setAgainActiveTree();
      addSuccessAlert(alert);
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
    }
    store.saving = false;
    render();
    selectClass(data.id);
  }

  async function onNewGroup(data) {
    try {
      store.saving = true;
      render();
      const aditionalData = {};
      if (data.subjects) {
        const types = {
          groups: 'group',
          courses: 'course',
          knowledges: 'knowledge',
          subjectType: 'subjectType',
        };
        forEach(store.newItem.parents, (parent) => {
          if (types[parent.nodeType]) {
            aditionalData[types[parent.nodeType]] = parent.value.id;
          }
        });
      }
      await createGroupRequest({
        ...data,
        aditionalData,
        program: store.program.id,
      });
      store.tree = await getProgramTree();
      store.newItem = null;
      addSuccessAlert(t('groupCreated'));
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
    }
    store.saving = false;
    render();
  }

  async function onDuplicateGroup({ id, name, abbreviation }) {
    try {
      store.saving = true;
      render();
      await duplicateGroupRequest({ id, name, abbreviation });
      store.tree = await getProgramTree();
      store.duplicateItem = null;
      addSuccessAlert(t('groupDuplicated'));
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
    }
    store.saving = false;
    render();
  }

  async function onNewSubjectType({ groupVisibility, ...data }) {
    try {
      store.saving = true;
      render();
      await createSubjectTypeRequest({
        ...data,
        groupVisibility: !!groupVisibility,
        program: store.program.id,
      });
      store.tree = await getProgramTree();
      store.newItem = null;
      addSuccessAlert(t('subjectTypeCreated'));
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
    }
    store.saving = false;
    render();
  }

  async function onNewKnowledge({ ...data }) {
    try {
      store.saving = true;
      render();
      await createKnowledgeRequest({
        ...data,
        program: store.program.id,
      });
      store.tree = await getProgramTree();
      store.newItem = null;
      addSuccessAlert(t('knowledgeCreated'));
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
    }
    store.saving = false;
    render();
  }

  async function addNewSubject({ name, course, internalId, credits }) {
    try {
      const { subject } = await createSubjectRequest({
        name,
        course,
        internalId,
        program: store.program.id,
        credits,
      });
      addSuccessAlert(ts('subjectCreated'));
      return subject;
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
      store.program.classes = isArray(store.program.classes) ? [...store.program.classes] : [];
      store.program = { ...store.program };
      store.saving = false;
      render();
    }
    return null;
  }

  async function addNewClass({
    courses,
    knowledges,
    substages,
    credits,
    groups,
    internalId,
    schedule,
    teacher,
    ...data
  }) {
    try {
      const { class: c } = await createClassRequest({
        ...data,
        course: courses,
        knowledge: knowledges,
        substage: substages,
        program: store.program.id,
        group: groups,
        schedule: schedule ? schedule.days : [],
        teachers: teacher ? [{ teacher, type: 'main-teacher' }] : [],
      });
      return c;
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
    }
    return null;
  }

  async function onNewSubjectSave(data) {
    try {
      // eslint-disable-next-line no-param-reassign
      if (!data.credits) data.credits = 1;
      store.saving = true;
      render();
      const subject = await addNewSubject({
        name: data.subject,
        course: isArray(data.courses) ? null : data.courses,
        internalId: data.internalId,
        credits: data.credits,
      });
      if (subject) {
        // eslint-disable-next-line no-param-reassign
        data.subject = subject?.id;
        await addNewClass(data);
        store.tree = await getProgramTree();
        store.newItem = null;
        addSuccessAlert(ts('classCreated'));
        store.saving = false;
        render();
        return true;
      }
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
      store.program.classes = [...store.program.classes];
      store.program = { ...store.program };
      store.saving = false;
      render();
    }
    return null;
  }

  async function addClassUsers(students, id) {
    try {
      store.saving = true;
      render();
      await addStudentIfNeed(students, id, 'class');
      store.tree = await getProgramTree();
      setAgainActiveTree();
      addSuccessAlert(messages.treeClass.studentsAddedSuccessfully);
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
    }
    store.saving = false;
    render();
  }

  function removeUserFromClass(student, id) {
    return new Promise((resolve, reject) => {
      openDeleteConfirmationModal({
        onConfirm: async () => {
          try {
            await removeStudentFromClassRequest(id, student);
            store.tree = await getProgramTree();
            setAgainActiveTree();
            resolve();
          } catch (error) {
            addErrorAlert(getErrorMessage(error));
            reject();
          }
          render();
        },
        onCancel: () => {
          console.log('on cancel');
          reject();
        },
      })();
    });
  }

  return (
    <ContextContainer fullHeight>
      <AdminPageHeader values={messages.header} />

      <Paper color="solid" shadow="none" padding={0}>
        <PageContainer>
          <ContextContainer padded="vertical">
            <Grid>
              {/* TREE ----------------------------------------- */}
              <Col span={5}>
                <Paper fullWidth padding={5}>
                  <ContextContainer divided>
                    <Grid grow>
                      <Col span={6}>
                        <SelectCenter
                          label={t('centerLabel')}
                          onChange={onSelectCenter}
                          value={store.centerId}
                        />
                      </Col>
                      <Col span={6}>
                        <SelectProgram
                          label={t('programLabel')}
                          onChange={onSelectProgram}
                          center={store.centerId}
                          value={store.programId}
                        />
                      </Col>
                    </Grid>
                    {store.tree ? (
                      <Box>
                        <Tree
                          treeData={store.tree}
                          selectedNode={store.editingItem ? store.editingItem.treeId : null}
                          allowDragParents={false}
                          initialOpen={map(store.tree, 'id')}
                        />
                      </Box>
                    ) : null}
                  </ContextContainer>
                </Paper>
              </Col>
              {/* CONTENT ----------------------------------------- */}
              <Col span={7}>
                {store.editingItem ? (
                  <Paper fullWidth padding={5}>
                    {store.editingItem.nodeType === 'program' ? (
                      <TreeProgramDetail
                        onSave={onSaveProgram}
                        program={store.editingItem.value}
                        center={store.centerId}
                        item={store.editingItem}
                        messages={messages.treeProgram}
                        messagesAddUsers={messages.addUsers}
                        saving={store.saving}
                      />
                    ) : null}
                    {store.editingItem.nodeType === 'courses' ? (
                      <TreeCourseDetail
                        onSave={onSaveCourse}
                        course={store.editingItem.value}
                        center={store.centerId}
                        item={store.editingItem}
                        messages={messages.treeCourse}
                        messagesAddUsers={messages.addUsers}
                        saving={store.saving}
                      />
                    ) : null}
                    {store.editingItem.nodeType === 'groups' ? (
                      <TreeGroupDetail
                        onSave={onSaveGroup}
                        program={store.program}
                        group={store.editingItem.value}
                        center={store.centerId}
                        item={store.editingItem}
                        messages={messages.treeGroup}
                        messagesAddUsers={messages.addUsers}
                        saving={store.saving}
                      />
                    ) : null}
                    {store.editingItem.nodeType === 'subjectType' ? (
                      <TreeSubjectTypeDetail
                        onSave={onSaveSubjectType}
                        subjectType={store.editingItem.value}
                        center={store.centerId}
                        item={store.editingItem}
                        messages={messages.treeSubjectType}
                        messagesAddUsers={messages.addUsers}
                        saving={store.saving}
                      />
                    ) : null}
                    {store.editingItem.nodeType === 'knowledges' ? (
                      <TreeKnowledgeDetail
                        onSave={onSaveKnowledge}
                        program={store.program}
                        center={store.centerId}
                        knowledge={store.editingItem.value}
                        item={store.editingItem}
                        messages={messages.treeKnowledge}
                        messagesAddUsers={messages.addUsers}
                        saving={store.saving}
                      />
                    ) : null}
                    {store.editingItem.nodeType === 'class' ? (
                      <TreeClassDetail
                        onSaveSubject={onSaveSubject}
                        onSaveClass={onSaveClass}
                        selectClass={selectClass}
                        addClassUsers={addClassUsers}
                        removeUserFromClass={removeUserFromClass}
                        program={store.program}
                        center={store.centerId}
                        messagesAddUsers={messages.addUsers}
                        classe={store.editingItem.value}
                        item={store.editingItem}
                        classes={store.classesBySubject[store.editingItem.value.subject?.id]}
                        messages={messages.treeClass}
                        saving={store.saving}
                        teacherSelect={
                          <SelectAgent profiles={store.profiles.teacher} centers={store.centerId} />
                        }
                      />
                    ) : null}
                  </Paper>
                ) : null}
                {store.newItem ? (
                  <Paper fullWidth padding={5}>
                    {store.newItem.nodeType === 'groups' ? (
                      <TreeGroupDetail
                        onSave={onNewGroup}
                        program={store.program}
                        item={store.newItem}
                        messages={messages.treeGroup}
                        saving={store.saving}
                        messagesAddUsers={messages.addUsers}
                        selectSubjectsNode={<SelectSubjectsByTable program={store.program} />}
                      />
                    ) : null}
                    {store.newItem.nodeType === 'subjectType' ? (
                      <TreeSubjectTypeDetail
                        onSave={onNewSubjectType}
                        item={store.newItem}
                        messagesAddUsers={messages.addUsers}
                        messages={messages.treeSubjectType}
                        saving={store.saving}
                        selectSubjectsNode={<SelectSubjectsByTable program={store.program} />}
                      />
                    ) : null}
                    {store.newItem.nodeType === 'knowledges' ? (
                      <TreeKnowledgeDetail
                        onSave={onNewKnowledge}
                        program={store.program}
                        item={store.newItem}
                        messagesAddUsers={messages.addUsers}
                        messages={messages.treeKnowledge}
                        saving={store.saving}
                        selectSubjectsNode={<SelectSubjectsByTable program={store.program} />}
                      />
                    ) : null}
                    {store.newItem.nodeType === 'subject' ? (
                      <TreeNewSubjectDetail
                        onSave={onNewSubjectSave}
                        item={store.newItem}
                        program={store.program}
                        messagesAddUsers={messages.addUsers}
                        messages={{
                          subjects: messages.subjects,
                          tableLabels: messages.tableLabels,
                        }}
                        saving={store.saving}
                        selectUserAgent={
                          <SelectUserAgent
                            profiles={store.profiles.teacher}
                            centers={store.centerId}
                          />
                        }
                      />
                    ) : null}
                    {store.newItem.nodeType === 'class' ? (
                      <TreeClassDetail
                        onSaveSubject={onSaveSubject}
                        onSaveClass={onSaveClass}
                        selectClass={selectClass}
                        messagesAddUsers={messages.addUsers}
                        item={store.newItem}
                        program={store.program}
                        classe={store.newItem.value}
                        classes={store.classesBySubject[store.newItem.value.subject?.id]}
                        messages={messages.treeClass}
                        saving={store.saving}
                        createMode={true}
                        teacherSelect={
                          <SelectAgent profiles={store.profiles.teacher} centers={store.centerId} />
                        }
                      />
                    ) : null}
                  </Paper>
                ) : null}
                {store.duplicateItem ? (
                  <Paper fullWidth padding={5}>
                    {store.duplicateItem.nodeType === 'groups' ? (
                      <TreeGroupDetail
                        onSave={onDuplicateGroup}
                        group={store.duplicateItem.value}
                        program={store.program}
                        messages={messages.treeGroup}
                        saving={store.saving}
                        duplicateMode={true}
                      />
                    ) : null}
                  </Paper>
                ) : null}
              </Col>
            </Grid>
          </ContextContainer>
        </PageContainer>
      </Paper>
    </ContextContainer>
  );
}

function SelectAgent(props) {
  return <SelectUserAgent {...props} />;
}
