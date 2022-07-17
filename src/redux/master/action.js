import { createAction } from '@reduxjs/toolkit'

export const requestListCompany = createAction('[REQ] LIST COMPANY')
export const successListCompany = createAction('[SUC] LIST COMPANY')
export const failureListCompany = createAction('[ERR] LIST COMPANY')

export const requestCreateCompany = createAction('[REQ] CREATE COMPANY')
export const successCreateCompany = createAction('[SUC] CREATE COMPANY')
export const failureCreateCompany = createAction('[ERR] CREATE COMPANY')