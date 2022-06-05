/* tslint:disable */
/* eslint-disable */
/**
 * Данные о ресторанах Санкт-Петербурга API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 6 (29.03.2022)
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Configuration } from './configuration';
import globalAxios, {
  AxiosPromise,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from './common';
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from './base';

/**
 *
 * @export
 * @interface Dataset
 */
export interface Dataset {
  /**
   * Общее количество элементов
   * @type {number}
   * @memberof Dataset
   */
  count?: number;
  /**
   * Ссылка на следующую страницу
   * @type {string}
   * @memberof Dataset
   */
  next?: string;
  /**
   * Ссылка на предыдущию страницу
   * @type {string}
   * @memberof Dataset
   */
  previous?: string;
  /**
   * Список элементов таблицы
   * @type {Array<Result>}
   * @memberof Dataset
   */
  results?: Array<Result>;
}
/**
 *
 * @export
 * @interface Result
 */
export interface Result {
  /**
   * ID в ИС ГТИБД
   * @type {number}
   * @memberof Result
   */
  oid?: number;
  /**
   * Название
   * @type {string}
   * @memberof Result
   */
  name?: string;
  /**
   * Название (англ.)
   * @type {string}
   * @memberof Result
   */
  name_en?: string;
  /**
   * Адрес
   * @type {string}
   * @memberof Result
   */
  address_manual?: string;
  /**
   * Телефоны
   * @type {string}
   * @memberof Result
   */
  phone?: string;
  /**
   * Сайт
   * @type {string}
   * @memberof Result
   */
  www?: string;
  /**
   * Электронная почта
   * @type {string}
   * @memberof Result
   */
  email?: string;
  /**
   * Кухня
   * @type {string}
   * @memberof Result
   */
  kitchen?: string;
  /**
   * Доступно для людей с ограниченными возможностями
   * @type {string}
   * @memberof Result
   */
  for_disabled?: string;
  /**
   * Геопозиция
   * @type {Array<number>}
   * @memberof Result
   */
  coord: Array<number>;
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @summary Запрос на выгрузку данных
     * @param {number} [page] Номер страницы, необязательно
     * @param {number} [perPage] Количество объектов на странице, по умолчанию 10, максимум 100, необязательно
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    datasets143VersionsLatestData570Get: async (
      page?: number,
      perPage?: number,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/datasets/143/versions/latest/data/570/`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearerAuth required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      if (page !== undefined) {
        localVarQueryParameter['page'] = page;
      }

      if (perPage !== undefined) {
        localVarQueryParameter['per_page'] = perPage;
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @summary Запрос на выгрузку данных
     * @param {number} [page] Номер страницы, необязательно
     * @param {number} [perPage] Количество объектов на странице, по умолчанию 10, максимум 100, необязательно
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async datasets143VersionsLatestData570Get(
      page?: number,
      perPage?: number,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Dataset>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.datasets143VersionsLatestData570Get(
          page,
          perPage,
          options
        );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
  };
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = DefaultApiFp(configuration);
  return {
    /**
     *
     * @summary Запрос на выгрузку данных
     * @param {number} [page] Номер страницы, необязательно
     * @param {number} [perPage] Количество объектов на странице, по умолчанию 10, максимум 100, необязательно
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    datasets143VersionsLatestData570Get(
      page?: number,
      perPage?: number,
      options?: any
    ): AxiosPromise<Dataset> {
      return localVarFp
        .datasets143VersionsLatestData570Get(page, perPage, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
  /**
   *
   * @summary Запрос на выгрузку данных
   * @param {number} [page] Номер страницы, необязательно
   * @param {number} [perPage] Количество объектов на странице, по умолчанию 10, максимум 100, необязательно
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public datasets143VersionsLatestData570Get(
    page?: number,
    perPage?: number,
    options?: AxiosRequestConfig
  ) {
    return DefaultApiFp(this.configuration)
      .datasets143VersionsLatestData570Get(page, perPage, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
