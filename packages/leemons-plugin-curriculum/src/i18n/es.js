module.exports = {
  listCurriculum: {
    view: 'Ver',
    delete: 'Borrar',
    deleted: 'Curriculum borrado',
    page_title: 'Biblioteca de Curricula',
    published: 'Publicados',
    draft: 'Borradores',
    page_description:
      'Estos son los planes de estudio de los programas que se imparten en el centro.',
  },
  addCurriculumBase: {
    newCurriculum: 'Nuevo curriculum',
    basic: 'Básicos',
    config: 'Estructura curricular',
    contentType: 'Tipo de contenido',
    loadOfContent: 'Carga de contenido',
  },
  addCurriculum: {
    noPrograms: 'Todos los programas de este centro ya se estan utilizando',
    newCurriculum: 'Nuevo curriculum',
    basicData: 'Datos básicos',
    description1:
      'Estructura del contenido curricular (posteriormente se podrá completar con el contenido específico de cada sección).',
    description2: 'Elegir el programa para estructurar su plan de estudios',
    nameLabel: 'Nombre',
    namePlaceholder: 'Introducir nombre...',
    countryLabel: 'País',
    countryPlaceholder: 'Seleccionar...',
    countryNothingFound: 'No hay datos',
    languageLabel: 'Idioma',
    languagePlaceholder: 'Seleccionar...',
    languageNothingFound: 'Sin datos',
    centerLabel: 'Centro',
    centerPlaceholder: 'Seleccionar...',
    centerNothingFound: 'Sin datos',
    programLabel: 'Programa',
    programPlaceholder: 'Seleccionar...',
    programNothingFound: 'Sin datos',
    tagsLabel: 'Etiquetas',
    tagsPlaceholder: 'Añadir etiquetas',
    tagsDescription: 'Introducir etiquetas separadas por comas',
    tagsNothingFound: 'No hay datos',
    tagsCreateLabel: '+ Crear {{etiqueta}}',
    descriptionLabel: 'Descripción',
    descriptionPlaceholder: 'Introducir descripción...',
    continueButtonLabel: 'Continuar',
    nameRequired: 'Campo necesario',
    countryRequired: 'Campo necesario',
    languageRequired: 'Campo necesario',
    centerRequired: 'Campo necesario',
    programRequired: 'Campo necesario',
  },
  addCurriculumStep1: {
    title: 'Define la estructura curricular',
    description:
      'Comienza por definir la estructura de tu contenido curricular, más tarde podrás completarlo creando el contenido específico de cada sección. Es posible que no todas las ramas de tu programa tengan contenido curricular.',
    saveButtonLabel: 'Continuar',
    program: 'Programa',
    courses: 'Curso',
    groups: 'Grupo',
    subjectType: 'Tipo',
    cycles: 'Ciclo',
    knowledges: 'Area',
    subject: 'Asignatura',
    alertTitle: 'Importante:',
    alertDescription:
      'Para poder vincular el Curriculum con actividades evaluables o calificables, <strong>es necesario que exista un nivel de asignatura</strong> y anidar dentro los contenidos, criterios de evaluación o estándares de aprendizaje.<br/> <strong>Si el programa seleccionado es de asignatura única</strong>, se pueden anidar directamente dichos items debajo de este nivel.',
  },
  addCurriculumStep2: {
    pageTitle: 'Bloques de contenido',
    pageDescription:
      'Continúa seleccionando un nivel y definiendo qué tipos de contenido son comunes a la rama seleccionada. \n' +
      'Puedes elegir entre múltiples formatos (listas, áreas de texto, grupos...) y entre 3 tipos de contenido: Conocimientos, criterios de evaluación califibales y criterios de evaluación no calificables (estos últimos no se utilizarán en los informes de notas finales).',
    continueButtonLabel: 'Continuar',
    addBranchButtonLabel: 'Añadir rama',
    title: 'Configuración de la rama',
    nameLabel: 'Nombre',
    namePlaceholder: 'Nombre de la nueva rama...',
    orderedLabel: 'Orden:',
    orderedPlaceholder: 'Seleccionar...',
    orderedNothingFound: 'Sin datos',
    evaluationCriteriaLabel: 'Este bloque contiene criterios de evaluación',
    saveButtonLabel: 'Guardar configuración',
    nameRequired: 'Campo necesario',
    fieldNameRequired: 'Campo necesario',
    orderedRequired: 'Campo necesario',
    blockNameRequired: 'Campo necesario',
    blockTypeRequired: 'Campo necesario',
    blockOrderedRequired: 'Campo necesario',
    fieldMinRequired: 'Campo necesario',
    fieldMaxRequired: 'Campo necesario',
    codeTypeRequired: 'Campo necesario',
    listTypeRequired: 'Campo necesario',
    listOrderedRequired: 'Campo necesario',
    listOrderedTextRequired: 'Campo necesario',
    listNumberingStyleRequired: 'Campo necesario',
    codeNodeLevelFieldRequired: 'Campo necesario',
    groupOrderedRequired: 'Campo necesario',
    groupColumnNameRequired: 'Campo necesario',
    groupColumnTypeRequired: 'Campo necesario',
    groupShowAsRequired: 'Campo necesario',
    curricularContentRequired: 'Campo necesario',
    orderedOptions: {
      'not-ordered': 'Sin ordenar',
      bullets: 'Solo circulos',
      'style-1': 'Estilo de numeración 1 (1,2,3,...)',
      'style-2': 'Estilo de numeración 2 (A,B,C,...)',
      custom: 'Numeración personalizada',
    },
    blockTypeOptions: {
      field: 'Campo',
      code: 'Código',
      textarea: 'Textarea',
      list: 'Lista',
      group: 'Grupo',
    },
    codeTypeOptions: {
      manual: 'Manual',
      autocomposed: 'Automático',
    },
    codeFieldNumbering: 'Numeración',
    addContent: 'Añadir nuevo bloque',
    blockNameLabel: 'Nombre del bloque',
    blockNamePlaceholder: 'Nombre del bloque de contenido',
    blockTypeLabel: 'Tipo',
    blockTypePlaceholder: 'Seleccionar...',
    blockTypeNothingFound: 'No hay datos',
    blockOrderedLabel: 'Ordenado',
    blockOrderedPlaceholder: 'Seleccionar...',
    groupTypeOfContentLabel: 'Tipo de contenido',
    groupTypeOfContentPLaceholder: 'Seleccionar...',
    groupContentConfigLabel: 'Configuración de contenido',
    groupAddColumnButtonLabel: 'Añadir columna',
    fieldLimitCharactersLabel: 'Caracteres limitados',
    fieldMinLabel: 'Caracteres mínimos',
    fieldMinPlaceholder: 'Mínimo...',
    fieldMaxLabel: 'Caracteres',
    fieldMaxPlaceholder: 'Máximo...',
    blockSaveConfigButtonLabel: 'Guardar bloque',
    numerationLabel: 'Tipo de numeración',
    useNumerationLabel: 'Numerar',
    addNumeration: 'Añadir numeración',
    subTypeLabel: 'Sub-tipo',
    codeTypePlaceholder: 'Seleccionar...',
    codeTypeNothingFound: 'No hay datos',
    codeComposerLabel: 'Compositor de código',
    listTypePlaceholder: 'Seleccionar...',
    listOrderedPlaceholder: 'Seleccionar...',
    listNumberingDigitsLabel: 'Digitos',
    listNumberingContinueFromPrevious: 'Continuar desde el bloque anterior',
    cancelCodeAutoComposedField: 'Cancelar',
    saveCodeAutoComposedField: 'Guardar',
    groupOrderedPlaceholder: 'Seleccionar...',
    groupColumnTypeLabel: 'Tipo',
    groupColumnTypePlaceholder: 'Seleccionar...',
    groupShowAs: 'Mostrar como',
    groupSaveConfig: 'Guardar configuración',
    groupAddElement: 'Añadir elemento',
    blockCancelConfigButtonLabel: 'Cancelar',
    newBlock: 'Nuevo bloque',
    curricularContentLabel: 'Contenido curricular',
    curricularContentPlaceholder: 'Seleccionar...',
    curricularKnowledges: 'Conocimientos',
    curricularQualifyingCriteria: 'Criterio calificable',
    curricularNonQualifyingCriteria: 'Criterio no calificable',
    tableAdd: 'Añadir',
    tableRemove: 'Borrar',
    tableEdit: 'Editar',
    tableAccept: 'Aceptar',
    tableCancel: 'Cancelar',
    fieldName: 'Nombre campo',
    subBlockTitle: 'Titulo de los sub-bloques',
    subBlockContent: 'Contenido de los sub-bloques',
    removeBlock: 'Eliminar bloque',
    subBlock: 'Sub-bloque',
    fieldRequired: 'Campo necesario',
    maxLength: 'Máximo {max} caracteres',
    useContentRelations: 'Relaciones de contenido',
    relatedTo: 'Relacionado con',
    typeOfRelation: 'Tipo de relación',
    father: 'Padre',
    label: 'Etiqueta',
  },
  addCurriculumStep3: {
    pageTitle: 'Carga de contenido',
    pageDescription:
      'Ahora puedes rellenar todos los bloques creados anteriormente en cada rama de tu programa.',
    addNode: 'Añadir {name}',
    description1:
      'Ahora se pueden añadir contenidos a cada tipología de bloque, recuerda que los contenidos del bloque marcado con una estrella podrán vincularse con actividades evaluables o calificables y viajar al sistema de calificaciones finales.',
    publish: 'Publicar curriculum',
    back: 'Volver',
    syncTree: 'Sincronizar árbol',
    syncTreeDone: 'Árbol sincronizado',
    published: 'Curriculum publicado',
    starDescription:
      'Los bloques marcados con una estrella corresponden a criterios de evaluación.',
    newBranchValue: {
      nameLabel: 'Nombre',
      subjectLabel: 'Asignatura',
      namePlaceholder: 'Nombre...',
      saveButtonLabel: 'Guardar',
      nameRequired: 'Campo necesario',
      noSubjectsFound:
        'Todas las asignaturas disponibles están actualmente añadidas al curriculum, si desea crear asignaturas nuevas, debe hacer en la sección de Portafolio Académico y, posteriormente, añadirlas aquí para completar su curriculum.',
    },
  },
  selectContentModal: {
    title: 'Contenido',
    saveButtonLabel: 'Añadir contenido',
    selectFromCurriculum: 'Seleccionar del plan de estudios',
    clearAll: 'Borrar todo',
    clearSelected: 'Borrar seleccionados',
    curriculum: 'Plan de estudios',
    added: 'Añadido con éxito',
    searchContent: 'Buscar contenido',
  },
};
