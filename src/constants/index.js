export const ROLE_LABELS = {
  mp_publisher: 'Publisher',
  mp_creator: 'Creator',
  mp_brand: 'Advertiser',
  mp_startup: 'Startup',
};
export const SUB_ROLE_LABELS = {
  mp_brand: 'Advertiser',
  mp_startup: 'Startup',
};
export const SCENARIO_TYPE_LABELS = {
  PLATOBLOCKCHAIN_FEED_ADD_ITEM: 'Platoblockchain deploy content',
  REGISTER_CONTENT_PASSPORT: 'Register content passport',
};
export const TRANSACTION_FEE_LABELS = {
  fee_nft_mp: 'NFT minting fee',
  fee_content_activation_mp: 'Content publication fee',
  fee_deployment_mp: 'Deployment deal fee',
  fee_order_publication_mp: 'Order publishing fee',
  fee_passport_mp: 'Passport creation fee',
};
export const TRANSACTION_FEE_LABELS_SUMMARY = {
  fee_deal_mp: 'Deal fee',
  fee_deployment_mp: 'Deployment deal fee',
  fee_content_activation_mp: 'Content publication fee',
  fee_order_publication_mp: 'Order publishing fee',
  fee_nft_mp: 'NFT minting fee',
  fee_passport_mp: 'Passport creation fee',
};

export const AI_CHECK_VERDICTS = {
  safety: 'SAFETY',
  warning: 'WARNING',
  notSafety: 'NOTSAFETY',
};

export const LABELS_BY_VERDICT = {
  [AI_CHECK_VERDICTS.safety]: 'Safe',
  [AI_CHECK_VERDICTS.warning]: 'Warning',
  [AI_CHECK_VERDICTS.notSafety]: 'Unsafe',
};

export const VERDICT_ICONS = {
  [AI_CHECK_VERDICTS.safety]: {
    primary: 'verdict-safety',
    secondary: 'verdict-safety--secondary',
  },
  [AI_CHECK_VERDICTS.warning]: {
    primary: 'verdict-warning',
    secondary: 'verdict-warning--secondary',
  },
  [AI_CHECK_VERDICTS.notSafety]: {
    primary: 'verdict-notSafety',
    secondary: 'verdict-notSafety--secondary',
  },
};

export const COLOR_BY_VERDICT = {
  [AI_CHECK_VERDICTS.safety]: {
    primary: '#278024',
    secondary: '#7BB23419',
    text: 'success',
  },
  [AI_CHECK_VERDICTS.warning]: {
    primary: '#ED851D',
    secondary: '#FFEFD719',
    text: 'warning',
  },
  [AI_CHECK_VERDICTS.notSafety]: {
    primary: '#F74E38',
    secondary: '#EB464619',
    text: 'error',
  },
};
