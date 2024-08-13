import { http, HttpResponse } from 'msw'

import { GetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    id: 'abc12345',
    name: 'Pizza Shop',
    description: 'Um restaurante fake legal pra caramba!',
    managerId: 'abc123',
    createdAt: '10/01/2024',
    updatedAt: '10/01/2024',
  })
})
