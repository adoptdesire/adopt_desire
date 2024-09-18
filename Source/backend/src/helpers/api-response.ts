interface IResponse {
  success: boolean;
  error: string | boolean;
  status: number;
  payload?: IDataResponse;
  message: string;
}

export interface IDataResponse {
  data: unknown;
}

export class APIResponse {
  private responseData: IResponse = <IResponse>{};

  /**
   * Getting formated response from here.
   * @param {number} success - Success status in true and false state.
   * @param {string} error - Set Error description in response.
   * @param {number} status - Set the status code of the request.
   * @param {string} message - Set the user friendly error message in response.
   * @param {IDataResponse | null } payload - Pass the payload to response.
   */
  constructor(
    success: boolean,
    error: string | boolean,
    status: number,
    message: string,
    payload: IDataResponse | null = null,
  ) {
    this.responseData.success = success;
    this.responseData.error = error;
    this.responseData.status = status;
    if (payload) this.responseData.payload = payload;
    this.responseData.message = message;
  }

  public get response(): IResponse {
    return this.responseData;
  }
}
