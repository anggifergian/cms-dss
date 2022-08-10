import { createAction } from "@reduxjs/toolkit";

export const requestListPlaylist = createAction('[Request] LIST PLAYLIST')
export const successListPlaylist = createAction('[Success] LIST PLAYLIST')
export const failureListPlaylist = createAction('[Error] LIST PLAYLIST')

export const requestCreatePlaylist = createAction('[Request] CREATE PLAYLIST')
export const successCreatePlaylist = createAction('[Success] CREATE PLAYLIST')
export const failureCreatePlaylist = createAction('[Error] CREATE PLAYLIST')

export const requestDeletePlaylist = createAction('[Request] DELETE PLAYLIST')
export const successDeletePlaylist = createAction('[Success] DELETE PLAYLIST')
export const failureDeletePlaylist = createAction('[Error] DELETE PLAYLIST')

// Playlist Resource
export const requestListPlaylistResource = createAction('[Request] Playlist Resource')
export const successListPlaylistResource = createAction('[Success] Playlist Resource')
export const failureListPlaylistResource = createAction('[Error] Playlist Resource')

