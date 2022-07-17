import { createAction } from '@reduxjs/toolkit'

// Company
export const requestListCompany = createAction('[REQ] LIST COMPANY')
export const successListCompany = createAction('[SUC] LIST COMPANY')
export const failureListCompany = createAction('[ERR] LIST COMPANY')

export const requestCreateCompany = createAction('[REQ] CREATE COMPANY')
export const successCreateCompany = createAction('[SUC] CREATE COMPANY')
export const failureCreateCompany = createAction('[ERR] CREATE COMPANY')

// Region
export const requestListRegion = createAction('[REQ] LIST REGION')
export const successListRegion = createAction('[SUC] LIST REGION')
export const failureListRegion = createAction('[ERR] LIST REGION')

export const requestCreateRegion = createAction('[REQ] CREATE REGION')
export const successCreateRegion = createAction('[SUC] CREATE REGION')
export const failureCreateRegion = createAction('[ERR] CREATE REGION')

// Branch
export const requestListBranch = createAction('[REQ] LIST BRANCH')
export const successListBranch = createAction('[SUC] LIST BRANCH')
export const failureListBranch = createAction('[ERR] LIST BRANCH')

export const requestCreateBranch = createAction('[REQ] CREATE BRANCH')
export const successCreateBranch = createAction('[SUC] CREATE BRANCH')
export const failureCreateBranch = createAction('[ERR] CREATE BRANCH')

// Device
export const requestListDevice = createAction('[REQ] LIST DEVICE')
export const successListDevice = createAction('[SUC] LIST DEVICE')
export const failureListDevice = createAction('[ERR] LIST DEVICE')

export const requestCreateDevice = createAction('[REQ] CREATE DEVICE')
export const successCreateDevice = createAction('[SUC] CREATE DEVICE')
export const failureCreateDevice = createAction('[ERR] CREATE DEVICE')

// Position
export const requestListPosition = createAction('[REQ] LIST POSITION')
export const successListPosition = createAction('[SUC] LIST POSITION')
export const failureListPosition = createAction('[ERR] LIST POSITION')

export const requestCreatePosition = createAction('[REQ] CREATE POSITION')
export const successCreatePosition = createAction('[SUC] CREATE POSITION')
export const failureCreatePosition = createAction('[ERR] CREATE POSITION')

// Resource
export const requestListResource = createAction('[REQ] LIST RESOURCE')
export const successListResource = createAction('[SUC] LIST RESOURCE')
export const failureListResource = createAction('[ERR] LIST RESOURCE')

export const requestCreateResource = createAction('[REQ] CREATE RESOURCE')
export const successCreateResource = createAction('[SUC] CREATE RESOURCE')
export const failureCreateResource = createAction('[ERR] CREATE RESOURCE')