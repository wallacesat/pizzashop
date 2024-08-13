import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      id: 'abc123',
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      phone: '64985577466',
      role: 'manager',
      createdAt: '10/01/2024',
      updatedAt: '10/01/2024',
    })
  },
)
