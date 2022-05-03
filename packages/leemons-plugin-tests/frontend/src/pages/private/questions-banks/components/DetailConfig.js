import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ContextContainer,
  ListInput,
  MultiSelect,
  Select,
  Stack,
} from '@bubbles-ui/components';
import { Controller } from 'react-hook-form';
import { useStore } from '@common';
import { getUserProgramsRequest, listSessionClassesRequest } from '@academic-portfolio/request';
import { groupBy, map, uniqBy } from 'lodash';

export default function DetailConfig({ form, t, onNext }) {
  const [isDirty, setIsDirty] = React.useState(false);
  const [store, render] = useStore({
    subjectsByProgram: {},
  });
  const program = form.watch('program');

  async function next() {
    setIsDirty(true);
    const formGood = await form.trigger(['program', 'subjects']);
    if (formGood) {
      onNext();
    }
  }

  async function load() {
    const [{ programs }, { classes }] = await Promise.all([
      getUserProgramsRequest(),
      listSessionClassesRequest(),
    ]);
    store.subjects = uniqBy(map(classes, 'subject'), 'id');
    store.subjectsByProgram = groupBy(
      map(store.subjects, (item) => ({
        value: item.id,
        label: item.name,
        program: item.program,
      })),
      'program'
    );
    store.programs = programs;
    store.programsData = map(programs, ({ id, name }) => ({ value: id, label: name }));
    render();
  }

  React.useEffect(() => {
    load();
  }, []);

  return (
    <ContextContainer>
      <Controller
        control={form.control}
        name="program"
        rules={{ required: t('programRequired') }}
        render={({ field }) => (
          <Select
            required
            error={isDirty ? form.formState.errors.program : null}
            label={t('programLabel')}
            data={store.programsData || []}
            {...field}
          />
        )}
      />

      <Controller
        control={form.control}
        name="subjects"
        rules={{ required: t('subjectRequired') }}
        render={({ field }) => (
          <MultiSelect
            required
            error={isDirty ? form.formState.errors.subjects : null}
            label={t('subjectLabel')}
            disabled={!program}
            data={store.subjectsByProgram[program] || []}
            {...field}
          />
        )}
      />

      <Controller
        control={form.control}
        name="categories"
        render={({ field }) => <ListInput {...field} label={t('categoriesLabel')} canAdd />}
      />

      <Stack justifyContent="end">
        <Button onClick={next}>{t('continue')}</Button>
      </Stack>
    </ContextContainer>
  );
}

DetailConfig.propTypes = {
  form: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  onNext: PropTypes.func,
};