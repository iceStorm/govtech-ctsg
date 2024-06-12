export enum GovaaLoginAction {
  SURVEY_LOGIN = 'SURVEY_LOGIN',
  SURVEY_CREATE_ACCOUNT = 'SURVEY_CREATE_ACCOUNT',
}

type GovaaLoginActionQuery = {
  action: GovaaLoginAction;
};

export default GovaaLoginActionQuery;
