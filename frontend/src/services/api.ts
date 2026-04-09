import { api } from '../config/api'
import type {
  BackendCharacter,
  BackendWord,
  CharacterPayload,
  WordPayload,
} from '../types'

export async function getCharacters(): Promise<BackendCharacter[]> {
  const { data } = await api.get<BackendCharacter[]>('/characters')
  return Array.isArray(data) ? data : []
}

export async function createCharacter(payload: CharacterPayload): Promise<BackendCharacter> {
  const { data } = await api.post<BackendCharacter>('/characters', payload)
  return data
}

export async function incrementCharacter(character: string): Promise<BackendCharacter> {
  const { data } = await api.post<BackendCharacter>('/characters/increase', { id: character })
  return data
}

export async function saveCharacter(payload: CharacterPayload): Promise<BackendCharacter> {
  const existing = await getCharacters()
  const found = existing.some((item) => item.character === payload.character)
  return found ? incrementCharacter(payload.character) : createCharacter(payload)
}

export async function getWords(): Promise<BackendWord[]> {
  const { data } = await api.get<BackendWord[]>('/words')
  return Array.isArray(data) ? data : []
}

export async function createWord(payload: WordPayload): Promise<BackendWord> {
  const { data } = await api.post<BackendWord>('/words', payload)
  return data
}

export async function saveWord(payload: WordPayload): Promise<BackendWord> {
  return createWord(payload)
}
