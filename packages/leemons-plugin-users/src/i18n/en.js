module.exports = {
  calendar: {
    user_section: 'My calendars',
  },
  user_data_page: {
    page_title: 'User data',
    page_description:
      'In this section you can configure the dataset fields for your users. The identification data are mandatory for the operation of the platform and mandatory for all users of any profile. The common fields are those shared by all users, they can be mandatory or optional (they are useful to save time when defining fields common to all users of the platform such as a name or surname). <br/> Last but not least, profiles have their own data sets that you can consult in the profiles section.',
    tabs: {
      system_data: 'System data',
      common_fields: 'Common fields',
    },
    systemData: {
      save: 'Save',
      saveSuccess: 'Data saved successfully',
      description1:
        'Mandatory fields in order to create user accounts (you can not edit o deleted)',
      description2: 'Fields included in the Leemons system that you can configure',
      table: {
        name: 'Name',
        description: 'Description',
        type: 'Type',
        actions: 'Actions',
        makeMandatory: 'Make mandatory',
        disableField: 'Disable field',
      },
      tableItems: {
        email: {
          name: 'Email',
          description: 'Unique identifier',
          type: 'Email',
        },
        password: {
          name: 'Password',
          description: '8 characters, 1 number, 1 uppercase, 1 special character',
          type: 'Password',
        },
        name: {
          name: 'Name',
          description: 'String, 26 regular characters (without special characters)',
          type: 'String',
        },
        surname: {
          name: 'Surname',
          description: 'String, 26 regular characters (without special characters)',
          type: 'String',
        },
        birthday: {
          name: 'Birthday',
          description: 'dd/mm/yyyy',
          type: 'Date',
        },
        surname2: {
          name: '2nd Surname',
          description: 'String, 26 regular characters (without special characters)',
          type: 'String',
        },
        avatar: {
          name: 'Avatar',
          description: 'Format: PNG, JPG, size 400x400px, max 500kb)',
          type: 'Image',
        },
      },
    },
    basic: {
      description: 'Configuration of general fields for your users',
      table: {
        name: 'Name',
        description: 'Description',
        type: 'Type',
        actions: 'Actions',
      },
      edit: 'Edit',
      delete: 'Delete',
    },
    dataset: {
      description: 'Configuration of general fields for your users',
      filter_by_center: 'Filter by center',
      add_field: 'Add field',
      no_data_in_table: 'No data available yet',
      deleted_done: 'Dataset item deleted',
    },
    remove_modal: {
      title: 'Do you want to delete the item?',
      message: 'This action cannot be undone',
      cancel: 'No',
      action: 'Delete',
    },
  },
  welcome_page: {
    page_title: 'Welcome to Users Admin',
    page_description:
      'Here we recommend you the first steps to config properly your Users Administration setup.',
  },
  hero_bg: {
    text: `“I don't know the meaning of half those long words, and, what's more, I don't believe you do either!”`,
    author: 'Alice in Wonderland <br/> Lewis Carrol',
  },
  list_profiles: {
    page_title: 'Profiles',
    page_description:
      'Use the user profiles to manage permissions for applications. Each time you install a new leemon we will ask you to define permissions for each existing profile.',
    name: 'Name',
    overview: 'Overview',
    actions: 'Actions',
    view: 'View',
  },
  detail_profile: {
    profile_name: 'Profile name',
    description: 'Profile description',
    leemon: 'Leemon',
    permissions_all: 'All',
    permissions: 'Permissions',
    select_permissions: 'Select a Leemon to assign permissions',
    dataset: 'Dataset',
    save_done: 'Profile created',
    update_done: 'Profile updated',
    translations: 'Translations',
    translations_warning: 'Must save the profile to keep translations stored',
    options_modal: {
      title: 'Translation',
      description: 'Add here the translations of the profile info to your system languages',
      accept: 'Accept',
      cancel: 'Cancel',
      profile_name: 'Profile name',
      profile_description: 'Profile description',
    },
    dataset_tab: {
      description: 'Configure the extra fields for this profile',
      filter_by_center: 'Filter by center',
      add_field: 'Add field',
      no_data_in_table: 'No data available yet',
      deleted_done: 'Dataset item deleted',
      table: {
        name: 'Name',
        description: 'Description',
        type: 'Type',
        actions: 'Actions',
        edit: 'Edit',
        delete: 'Delete',
      },
    },
    remove_modal: {
      title: 'Do you want to delete the item?',
      message: 'This action cannot be undone',
      cancel: 'No',
      action: 'Delete',
    },
  },
  login: {
    title: 'Login to your account',
    email: 'Email',
    password: 'Password',
    remember_password: 'I cant remember my password',
    log_in: 'Log in',
    not_registered: 'I am not registered',
    form_error: 'Email or password does not match',
  },
  registerPassword: {
    title: 'Create your password',
    password: 'Password',
    repeatPassword: 'Repeat password',
    setPassword: 'Set password',
    repeatPasswordPlaceholder: 'Repeat your password',
    passwordPlaceholder: 'Your password',
    passwordMatch: 'Passwords not match',
    tokenError: 'The code to set the password has expired or is not valid, contact your center.',
  },
  recover: {
    title: 'Forgot my password',
    description:
      'Enter the email address associated with your account and we will send you a link to reset your password.',
    email: 'Email',
    resetPassword: 'Reset password',
    returnLogin: 'Return to login',
    emailSendTo: 'We have sent you an email to: {email}',
    emailRequired: 'Email required',
    accountNotActive:
      'Your account is not yet active, we have sent you the activation email from which you can set your password.',
  },
  reset: {
    title: 'Create new password',
    description: 'Enter a new password to access leemons.',
    tokenNoValid: 'The reset token has expired or is invalid.',
    password: 'Password',
    resetPassword: 'Reset password',
    returnLogin: 'Return to login',
    passwordRequired: 'Password required',
  },
  selectProfile: {
    title: 'Hi {name}',
    number_of_profiles:
      'You have {profiles} profiles on leemons, please select the one with you want to access',
    several_centers:
      'You have several centers and profiles in Leemons, please select how you want to access.',
    use_always_profile: 'Remember this configuration',
    change_easy: 'You can always change your profile or center from your user account.',
    log_in: 'Log in',
    choose_center: 'Choose center',
  },
  list_users: {
    pageTitle: 'Users list',
    centerLabel: 'Center',
    profileLabel: 'Profile',
    searchLabel: 'Search',
    nameHeader: 'Name',
    surnameHeader: 'Surname',
    emailHeader: 'Email',
    birthdayHeader: 'Birthday',
    phoneHeader: 'Phone',
    actionsHeader: 'Actions',
    usersTab: 'Users',
    clearFilter: 'Clear filter',
    view: 'View',
    show: 'Show',
    goTo: 'Go to',
  },
  create_users: {
    male: 'Male',
    female: 'Female',
    pageTitle: 'Create users',
    centerLabel: 'Center',
    centersLabel: 'Centers',
    centersRequired: 'Centers required',
    profileLabel: 'Profile',
    emailHeader: 'Email',
    passwordHeader: 'Password',
    emailHeaderRequired: 'Email is required',
    emailHeaderNotEmail: 'Email is not valid',
    nameHeader: 'Name',
    nameHeaderRequired: 'Name is required',
    surnameHeader: 'Surname',
    surnameHeaderRequired: 'Surname is required',
    genderHeader: 'Gender',
    genderHeaderRequired: 'Gender is required',
    birthdayHeader: 'Birthday',
    birthdayHeaderRequired: 'Birthday is required',
    avatarHeader: 'Avatar',
    avatarHeaderRequired: 'Avatar is required',
    secondSurnameHeader: 'Second surname',
    secondSurnameHeaderRequired: 'Second surname is required',
    tagsHeader: 'Tags',
    tableAdd: 'Add',
    tableRemove: 'Remove',
    userAlreadyHaveThisConfig: 'The user already exists in that center with that profile.',
    userEmailAlreadyAdded: 'You already have a user added with that email',
    tagsForAllUsers: 'Tags for all users to add',
    save: 'Save',
    usersAddedSuccessfully: 'Users added successfully',
  },
  needDatasetDataModal: {
    goPageButton: 'Go to page',
  },
  userDataDatasetPage: {
    pageTitle: 'User data',
    pageDescription: 'Add required data',
    save: 'Save',
    saveSuccess: 'Data saved successfully',
  },
  detailUser: {
    imageUpdated: 'Image updated',
    changeAvatar: 'Change avatar',
    selectCenter: 'Select center',
    selectProfile: 'Select profile',
    noResults: 'No results',
    preferredGenderLabel: 'Preferred gender pronoun',
    personalInformationLabel: 'Personal information',
    recoveryLink: 'Send recovery link',
    otherInformationLabel: 'Other information',
    tags: 'Tags',
    addTag: 'Add Tag',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    saveSuccess: 'Saved successfully',
  },
  userDetailModal: {
    male: 'Male',
    female: 'Female',
    personalInformation: 'Personal information',
    badges: 'Tags',
    email: 'Email',
    name: 'First name',
    surnames: 'Last name',
    birthday: 'Date of birth',
    gender: 'Gender',
    rol: 'Role',
  },
  changeLanguage: {
    title: 'Language settings',
    interface: 'Interface language',
    selectLocale: 'Select a language',
    save: 'Save',
    success: 'Language changed',
  },
};
