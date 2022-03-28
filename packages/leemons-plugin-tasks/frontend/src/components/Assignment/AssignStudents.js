import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContextContainer } from '@bubbles-ui/components';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import SubjectSelector from './AssignStudents/components/SubjectSelector';
import AssigneeTypeSelector from './AssignStudents/components/AssigneeTypeSelector';
import AssigneeSelector from './AssignStudents/components/AssigneeSelector';

export default function AssignStudents({ labels, profile, onChange, task }) {
  const form = useForm({
    subjects: [],
    type: null,
    assignee: [],
  });
  const { control, watch } = form;

  useEffect(() => {
    const subscription = watch((data) => {
      console.log(data);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <FormProvider {...form}>
      <Controller
        control={control}
        name="subjects"
        render={({ field }) => <SubjectSelector {...field} labels={labels} task={task} />}
      />
      <ContextContainer title={labels.selectStudentsTitle}>
        <Controller
          control={control}
          name="type"
          render={({ field }) => <AssigneeTypeSelector {...field} labels={labels} />}
        />
        <Controller
          control={control}
          name="assignee"
          render={({ field }) => <AssigneeSelector {...field} labels={labels} profile={profile} />}
        />
      </ContextContainer>
    </FormProvider>
  );
}

AssignStudents.defaultProps = {
  labels: {
    assignTo: {
      class: 'Class',
      customGroups: 'Custom Groups',
      session: 'Session',
    },
    selectStudentsTitle: 'Who will perform the task?',
    excludeStudents: 'Exclude students',
    subjects: {
      title: 'Subjects to be evaluated in this task',
      subtitle: 'NOTE: At least one of them',
    },
    unableToAssignStudentsMessage:
      'The students which are not enrolled in all the selected subjects will not be assigned',
  },
};
AssignStudents.propTypes = {
  labels: PropTypes.object,
  profile: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  task: PropTypes.shape({}),
};
