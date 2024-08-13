import { api } from '@/lib/axios'

export interface GetProfileResponse {
  name: string
  id: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: string | null
  updatedAt: string | null
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/me')

  return response.data
}
