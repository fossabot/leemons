module.exports = {
  datasetItemDrawer: {
    save_done: 'Campo creado',
    update_done: 'Campo actualizado',
    messages: {
      saveButtonLabel: 'Guardar',
      namePlaceholder: 'Nuevo campo',
      centerLabel: 'Centro',
      fieldTypeLabel: 'Tipo de campo',
      fieldTypePlaceholder: 'Seleccionar tipo de campo',
      textFieldRequiredLabel: 'Obligatorio',
      textFieldMaskedLabel: 'Enmascarado',
      fieldLengthLabel: 'Longitud del campo',
      fieldLengthMinLabel: 'Mín',
      fieldLengthMaxLabel: 'Max',
      fieldLengthOnlyNumbersLabel: 'Sólo números',
      fieldDateLabel: 'Limitado a',
      fieldDateMinLabel: 'Desde',
      fieldDateMaxLabel: 'Hasta',
      multioptionShowAsLabel: 'Mostrar como',
      fieldMultioptionLimitsLabel: 'Número de opciones',
      fieldMultioptionLimitsMinLabel: 'Mínimo',
      fieldMultioptionLimitsMaxLabel: 'Máximo',
      fieldMultioptionShowAsPlaceholder: 'Seleccione mostrar como',
      fieldMultioptionOptionsLabel: 'Crear opciones',
      fieldMultioptionAddOptionsLabel: 'Añadir opción',
      booleanShowAsLabel: 'Mostrar como',
      fieldBooleanShowAsPlaceholder: 'Seleccionar mostrar como',
      booleanInitialStateLabel: 'Estado inicial',
      booleanInitialStateLabelPlaceholder: 'Seleccionar estado inicial',
      fieldSelectOptionsLabel: 'Crear opciones',
      fieldSelectAddOptionsLabel: 'Añadir opción',
      userCentersLabel: 'Centro/s',
      userCentersDescription: 'Muestra sólo los usuarios del centro o centros seleccionados',
      userProfileLabel: 'Perfil/es',
      userProfileDescription: 'Muestra sólo los usuarios del tipo o tipos de perfil seleccionados',
      fieldConfigLocaleTitle: 'Configuración e idiomas',
      localeLabelLabel: 'Etiqueta',
      localeLabelDescription: 'Nombre visible en el archivo',
      localeDescriptionLabel: 'Descripción',
      localeDescriptionDescription: 'Descripción del campo',
      localeHelpLabel: 'Texto de ayuda',
      localeHelpDescription:
        'Utilice este texto para orientar al usuario sobre el contenido esperado',
      localeMultioptionSelectPlaceholderLabel: 'Primera opción',
      translateOptionsHelpLabel: 'El contenido no traducido aparecerá en el idioma por defecto',
      translateOptionsButtonLabel: 'Opción de traducción',
      translateOptionsModalTitle: 'Traducción de opciones',
      translateOptionsModalDescription: 'Añade aquí las traducciones de las opciones al inglés',
      translateOptionsValueColLabel: 'Valor',
      translateOptionsTranslationColLabel: 'Traducción al {code}',
      localeBooleanOptionLabel: 'Etiqueta de la opción',
      localeBooleanOptionDescription: 'Texto junto a la casilla de verificación',
      localeBooleanYesLabel: 'Etiqueta "Si"',
      localeBooleanNoLabel: 'Etiqueta "No"',
      fieldPermissionsTitle: 'Permisos del perfil',
      permissionsProfileLabel: 'Perfil',
      permissionsViewLabel: 'Ver',
      permissionsEditLabel: 'Editar',
      translateOptionsContinueButtonLabel: 'Continuar',
      previewLabel: 'Previsualización',
    },
    errorMessages: {
      nameRequired: 'Campo necesario',
      fieldTypeRequired: 'Campo necesario',
      multioptionShowAsRequired: 'Campo necesario',
      booleanShowAsRequired: 'Campo necesario',
      booleanInitialStateRequired: 'Campo necesario',
      localeLabelRequired: 'Campo necesario',
      optionFieldRequired: 'Campo necesario',
    },
    selectOptions: {
      allLabel: 'Todos',
      fieldBooleanInitialState: {
        '-': 'Sin seleccionar',
        si: 'Si',
        no: 'No',
      },
      fieldMultioptionShowAs: {
        dropdown: 'Dropdown',
        checkboxs: 'Checkboxs',
        radio: 'Radio',
      },
      fieldBooleanShowAs: {
        checkbox: 'Checkbox',
        radio: 'Radio',
        switcher: 'Switcher',
      },
      fieldTypes: {
        text_field: 'Campo',
        rich_text: 'Area de texto',
        number: ' Numero',
        date: 'Fecha',
        email: 'Email',
        phone: 'Teléfono',
        link: 'Enlace',
        multioption: 'Mutiples opciones',
        boolean: 'Si/No',
        select: 'Opciones',
        user: 'Usuario',
      },
    },
    /*
    preview: 'Previsualización',
    new_field: 'Nuevo campo',
    edit_field: 'Editar campo',
    field_type: 'Tipo de campo',
    required: 'Requerido',
    masked: 'Enmascarado',
    field_length: 'Longitud del campo',
    min: 'Min',
    max: 'Max',
    only_numbers: 'Sólo números',
    config_and_languages: 'Configuración e idiomas',
    label_title: 'Etiqueta',
    label_description: 'Nombre visible en el campo.',
    help_text_title: 'Texto de ayuda',
    help_text_description:
      'Utilice este texto para orientar al usuario sobre el contenido esperado.',
    description_text_title: 'Descripcion',
    description_text_description: 'Descripción del campo.',
    human_error_title: 'Texto de error humano',
    human_error_description: 'La validación y el formato requeridos se añadirán automáticamente.',
    profiles_permission: 'Permiso de perfiles',
    profile: 'Perfil',
    select_type: 'Selecciona un tipo',
    all_centers: 'Todos',
    centers: 'Centros',
    add_center: 'Añadir centro',
    select_one_value: 'Selecciona valor',
    save: 'Guardar',
    view: 'Ver',
    edit: 'Editar',
    all_profiles: 'Todos los perfiles',
    profile_title: 'Perfil/es',
    profile_description: 'Muestra solo los usuarios del tipo de perfil/es seleccionado',
    center_all_centers: 'Todos los centros',
    center_title: 'Centro/s',
    center_description: 'Muestra solo los usuarios del centro/s seleccionado',
    options_title: 'Opciones',
    options_description: 'Añade distintas opciones para que se pueda seleccionar entre ellas.',
    options_description2: 'Añade las traducciones de las opciones',
    add_option: 'Añadir opción',
    number_of_options: 'Numero de opciones',
    limited_to: 'Limitado a',
    from: 'Desde',
    to: 'a',
    show_as: 'Mostrar como',
    show_as_description: 'Cambia como se muestra visualmente.',
    first_option_not_eligible: 'Primera opción (no elegible)',
    option_label: 'Etiqueta de opción',
    option_label_description: 'Texto al lado del checkbox.',
    initial_status: 'Estado inicial',
    yes_label: '"Si" Label',
    no_label: '"No" Label',
    save_done: 'Campo creado',
    update_done: 'Campo actualizado',
    options_modal: {
      title: 'Traducción de opciones',
      description: 'Añade aquí las traducciones de las opciones a {locale}',
      value: 'Valor',
      translate_to: 'Traducción a {locale}',
      accept: 'Aceptar',
      cancel: 'Cancelar',
    },

     */
  },
};
