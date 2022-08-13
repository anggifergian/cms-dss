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
export const requestListPlaylistResource = createAction('[Request] List Playlist Resource')
export const successListPlaylistResource = createAction('[Success] List Playlist Resource')
export const failureListPlaylistResource = createAction('[Error] List Playlist Resource')

export const requestAddPlaylistResource = createAction('[Request] Add Playlist Resource')
export const successAddPlaylistResource = createAction('[Success] Add Playlist Resource')
export const failureAddPlaylistResource = createAction('[Error] Add Playlist Resource')

export const requestUpdatePlaylistResource = createAction('[Request] Update Playlist Resource')
export const successUpdatetPlaylistResource = createAction('[Success] Update Playlist Resource')
export const failureUpdatetPlaylistResource = createAction('[Error] Update Playlist Resource')

export const requestDeletePlaylistResource = createAction('[Request] Delete Playlist Resource')
export const successDeletetPlaylistResource = createAction('[Success] Delete Playlist Resource')
export const failureDeletetPlaylistResource = createAction('[Error] Delete Playlist Resource')
