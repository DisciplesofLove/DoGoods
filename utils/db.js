const db = {
    STORES: {
        users: 'users',
        listings: 'listings',
        trades: 'trades'
    },

    // Initialize IndexedDB database
    init: async () => {
        if (window.indexedDB) {
            return new Promise((resolve, reject) => {
                const request = window.indexedDB.open('ShareFoodsDB', 1);

                request.onerror = () => {
                    reject('Database failed to open');
                };

                request.onsuccess = () => {
                    resolve('Database opened successfully');
                };

                request.onupgradeneeded = (e) => {
                    const db = e.target.result;

                    // Create object stores if they don't exist
                    if (!db.objectStoreNames.contains('users')) {
                        db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
                    }
                    if (!db.objectStoreNames.contains('listings')) {
                        db.createObjectStore('listings', { keyPath: 'id', autoIncrement: true });
                    }
                    if (!db.objectStoreNames.contains('trades')) {
                        db.createObjectStore('trades', { keyPath: 'id', autoIncrement: true });
                    }
                };
            });
        } else {
            return Promise.reject('IndexedDB not supported');
        }
    },

    // Add item to a store
    add: async (storeName, item) => {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open('ShareFoodsDB', 1);

            request.onsuccess = (e) => {
                const db = e.target.result;
                const transaction = db.transaction(storeName, 'readwrite');
                const store = transaction.objectStore(storeName);
                const addRequest = store.add(item);

                addRequest.onsuccess = () => resolve(addRequest.result);
                addRequest.onerror = () => reject(addRequest.error);
            };

            request.onerror = () => reject(request.error);
        });
    },

    // Get all items from a store
    getAll: async (storeName) => {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open('ShareFoodsDB', 1);

            request.onsuccess = (e) => {
                const db = e.target.result;
                const transaction = db.transaction(storeName, 'readonly');
                const store = transaction.objectStore(storeName);
                const getAllRequest = store.getAll();

                getAllRequest.onsuccess = () => resolve(getAllRequest.result);
                getAllRequest.onerror = () => reject(getAllRequest.error);
            };

            request.onerror = () => reject(request.error);
        });
    },

    // Get item by ID
    get: async (storeName, id) => {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open('ShareFoodsDB', 1);

            request.onsuccess = (e) => {
                const db = e.target.result;
                const transaction = db.transaction(storeName, 'readonly');
                const store = transaction.objectStore(storeName);
                const getRequest = store.get(id);

                getRequest.onsuccess = () => resolve(getRequest.result);
                getRequest.onerror = () => reject(getRequest.error);
            };

            request.onerror = () => reject(request.error);
        });
    },

    // Update item
    update: async (storeName, id, item) => {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open('ShareFoodsDB', 1);

            request.onsuccess = (e) => {
                const db = e.target.result;
                const transaction = db.transaction(storeName, 'readwrite');
                const store = transaction.objectStore(storeName);
                const updateRequest = store.put({ ...item, id });

                updateRequest.onsuccess = () => resolve(updateRequest.result);
                updateRequest.onerror = () => reject(updateRequest.error);
            };

            request.onerror = () => reject(request.error);
        });
    },

    // Delete item
    delete: async (storeName, id) => {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open('ShareFoodsDB', 1);

            request.onsuccess = (e) => {
                const db = e.target.result;
                const transaction = db.transaction(storeName, 'readwrite');
                const store = transaction.objectStore(storeName);
                const deleteRequest = store.delete(id);

                deleteRequest.onsuccess = () => resolve();
                deleteRequest.onerror = () => reject(deleteRequest.error);
            };

            request.onerror = () => reject(request.error);
        });
    }
};
