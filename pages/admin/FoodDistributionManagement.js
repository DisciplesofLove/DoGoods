function FoodDistributionManagement() {
    try {
        const [distributions, setDistributions] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        const [showForm, setShowForm] = React.useState(false);
        const [formData, setFormData] = React.useState({
            title: '',
            location: '',
            date: '',
            time: '',
            capacity: '',
            description: '',
            status: 'scheduled'
        });

        React.useEffect(() => {
            loadDistributions();
        }, []);

        const loadDistributions = async () => {
            setLoading(true);
            try {
                // Simulated API call
                const response = await new Promise(resolve => 
                    setTimeout(() => resolve({
                        items: [
                            {
                                id: 1,
                                title: 'Downtown Food Distribution',
                                location: '123 Main St, Downtown',
                                date: '2024-06-15',
                                time: '10:00 AM - 2:00 PM',
                                capacity: 150,
                                registered: 87,
                                description: 'Monthly food distribution for downtown residents.',
                                status: 'scheduled'
                            },
                            {
                                id: 2,
                                title: 'Community Center Distribution',
                                location: '456 Park Ave, Westside',
                                date: '2024-06-22',
                                time: '9:00 AM - 1:00 PM',
                                capacity: 100,
                                registered: 65,
                                description: 'Food distribution for families in the Westside area.',
                                status: 'scheduled'
                            },
                            {
                                id: 3,
                                title: 'School Pantry Program',
                                location: 'Lincoln Elementary School',
                                date: '2024-06-10',
                                time: '3:00 PM - 6:00 PM',
                                capacity: 75,
                                registered: 75,
                                description: 'Food distribution for school families.',
                                status: 'full'
                            },
                            {
                                id: 4,
                                title: 'Senior Center Distribution',
                                location: 'Golden Years Senior Center',
                                date: '2024-06-05',
                                time: '10:00 AM - 12:00 PM',
                                capacity: 50,
                                registered: 32,
                                description: 'Food distribution tailored for seniors.',
                                status: 'completed'
                            }
                        ]
                    }), 1000)
                );
                setDistributions(response.items);
            } catch (error) {
                console.error('Load distributions error:', error);
                setError('Failed to load distribution events');
            } finally {
                setLoading(false);
            }
        };

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                // Simulated API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const newDistribution = {
                    id: distributions.length + 1,
                    ...formData,
                    registered: 0
                };
                
                setDistributions([...distributions, newDistribution]);
                setShowForm(false);
                setFormData({
                    title: '',
                    location: '',
                    date: '',
                    time: '',
                    capacity: '',
                    description: '',
                    status: 'scheduled'
                });
                
            } catch (error) {
                console.error('Create distribution error:', error);
                alert('Failed to create distribution event');
            }
        };

        const handleDelete = async (id) => {
            if (!confirm('Are you sure you want to delete this distribution event?')) return;
            
            try {
                // Simulated API call
                await new Promise(resolve => setTimeout(resolve, 500));
                setDistributions(distributions.filter(dist => dist.id !== id));
            } catch (error) {
                console.error('Delete distribution error:', error);
                alert('Failed to delete distribution event');
            }
        };

        const handleStatusChange = async (id, status) => {
            try {
                // Simulated API call
                await new Promise(resolve => setTimeout(resolve, 500));
                setDistributions(distributions.map(dist => 
                    dist.id === id ? { ...dist, status } : dist
                ));
            } catch (error) {
                console.error('Update status error:', error);
                alert('Failed to update status');
            }
        };

        const getStatusBadge = (status) => {
            const statusStyles = {
                scheduled: 'bg-blue-100 text-blue-800',
                full: 'bg-yellow-100 text-yellow-800',
                completed: 'bg-green-100 text-green-800',
                cancelled: 'bg-red-100 text-red-800'
            };
            
            return (
                <span className={`px-2 py-1 text-xs rounded-full ${statusStyles[status]}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            );
        };

        return (
            <AdminLayout active="distribution">
                <div data-name="food-distribution-management" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Food Distribution Management</h1>
                            <p className="mt-2 text-gray-600">
                                Manage food distribution events and track attendance.
                            </p>
                        </div>
                        <Button
                            variant="primary"
                            icon={<i className="fas fa-plus"></i>}
                            onClick={() => setShowForm(!showForm)}
                        >
                            {showForm ? 'Cancel' : 'Create Event'}
                        </Button>
                    </div>

                    {showForm && (
                        <Card className="mb-8">
                            <form onSubmit={handleSubmit} className="p-6">
                                <h2 className="text-xl font-semibold mb-6">Create Distribution Event</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <Input
                                        label="Event Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    
                                    <Input
                                        label="Location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    
                                    <Input
                                        label="Date"
                                        name="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    
                                    <Input
                                        label="Time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 10:00 AM - 2:00 PM"
                                        required
                                    />
                                    
                                    <Input
                                        label="Capacity"
                                        name="capacity"
                                        type="number"
                                        value={formData.capacity}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    
                                    <Input
                                        label="Status"
                                        name="status"
                                        type="select"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        options={[
                                            { value: 'scheduled', label: 'Scheduled' },
                                            { value: 'full', label: 'Full' },
                                            { value: 'completed', label: 'Completed' },
                                            { value: 'cancelled', label: 'Cancelled' }
                                        ]}
                                        required
                                    />
                                    
                                    <div className="md:col-span-2">
                                        <Input
                                            label="Description"
                                            name="description"
                                            type="textarea"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-4">
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                    >
                                        Create Event
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    )}

                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-32"></div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center py-8">
                            <i className="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
                            <p className="text-gray-600">{error}</p>
                            <Button
                                variant="secondary"
                                className="mt-4"
                                onClick={loadDistributions}
                            >
                                Try Again
                            </Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Event
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date & Time
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Capacity
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {distributions.map(dist => (
                                        <tr key={dist.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{dist.title}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                    {dist.description}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{formatDate(dist.date)}</div>
                                                <div className="text-sm text-gray-500">{dist.time}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {dist.location}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {dist.registered} / {dist.capacity}
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                                    <div 
                                                        className="bg-green-600 h-2 rounded-full" 
                                                        style={{ width: `${(dist.registered / dist.capacity) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(dist.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        icon={<i className="fas fa-users"></i>}
                                                        onClick={() => window.location.href = `/admin/distribution/${dist.id}/attendees`}
                                                    >
                                                        Attendees
                                                    </Button>
                                                    
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        icon={<i className="fas fa-edit"></i>}
                                                        onClick={() => window.location.href = `/admin/distribution/${dist.id}/edit`}
                                                    >
                                                        Edit
                                                    </Button>
                                                    
                                                    {dist.status !== 'completed' && dist.status !== 'cancelled' && (
                                                        <Button
                                                            variant="primary"
                                                            size="sm"
                                                            icon={<i className="fas fa-check-circle"></i>}
                                                            onClick={() => handleStatusChange(dist.id, 'completed')}
                                                        >
                                                            Complete
                                                        </Button>
                                                    )}
                                                    
                                                    {dist.status !== 'cancelled' && (
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            icon={<i className="fas fa-ban"></i>}
                                                            onClick={() => handleStatusChange(dist.id, 'cancelled')}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    )}
                                                    
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        icon={<i className="fas fa-trash"></i>}
                                                        onClick={() => handleDelete(dist.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </AdminLayout>
        );
    } catch (error) {
        console.error('FoodDistributionManagement error:', error);
        reportError(error);
        return null;
    }
}
