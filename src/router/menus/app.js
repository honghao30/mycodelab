export default [
    // 브랜드 개설
    {
        path: "/ParkingApp",
        name: "Parking",
        component: () => import('@/views/apps/parking.vue'),
        meta: {
            onlyBody: true
        }
    }
  ]