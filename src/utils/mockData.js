export const mockOrders = [
  { id: 1, product: 'Wooden Table', quantity: 5, status: 'planned', progress: 0 },
  { id: 2, product: 'Chair', quantity: 10, status: 'in_progress', progress: 50 },
  { id: 3, product: 'Desk', quantity: 3, status: 'done', progress: 100 },
  { id: 4, product: 'Shelf', quantity: 2, status: 'canceled', progress: 0 },
];

export const mockKpis = { completed: 5, inProgress: 3, delayed: 2 };

export const mockBOM = {
  components: [
    { item: 'Wooden Legs', quantity: 4 },
    { item: 'Wooden Top', quantity: 1 },
    { item: 'Screws', quantity: 12 },
  ],
  operations: [
    { name: 'Assembly', duration: 60 },
    { name: 'Painting', duration: 30 },
    { name: 'Packing', duration: 20 },
  ],
};

export const mockWorkOrders = mockBOM.operations.map((op, i) => ({
  id: i + 1,
  operationName: op.name,
  duration: op.duration,
  status: 'pending',
  comments: '',
}));

export const mockWorkCenters = [
  { id: 1, name: 'Assembly Line', location: 'Floor 1', costPerHour: 50, downtime: false },
  { id: 2, name: 'Paint Floor', location: 'Floor 2', costPerHour: 40, downtime: false },
  { id: 3, name: 'Packaging Line', location: 'Floor 3', costPerHour: 30, downtime: true },
];

export const mockStock = [
  { id: 1, product: 'Wooden Legs', movementType: 'in', quantity: 100, balance: 96 },
  { id: 2, product: 'Screws', movementType: 'out', quantity: 12, balance: 988 },
];

export const mockProducts = [
  { id: 1, name: 'Wooden Table', description: 'Large table', stockQuantity: 5 },
  { id: 2, name: 'Chair', description: 'Wooden chair', stockQuantity: 10 },
];

export const mockReports = [
  { id: 1, task: 'Assembly', duration: 60, completed: true },
  { id: 2, task: 'Painting', duration: 30, completed: false },
];