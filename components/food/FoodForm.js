function FoodForm({
    initialData = null,
    onSubmit,
    loading = false
}) {
    try {
        const [formData, setFormData] = React.useState({
            title: '',
            description: '',
            quantity: '',
            unit: 'kg',
            category: '',
            expiryDate: '',
            type: 'donation', // 'donation' or 'trade'
            tradePreference: '',
            location: '',
            image: null,
            ...initialData
        });

        const [errors, setErrors] = React.useState({});

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
            // Clear error when field is modified
            if (errors[name]) {
                setErrors(prev => ({
                    ...prev,
                    [name]: null
                }));
            }
        };

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                setFormData(prev => ({
                    ...prev,
                    image: file
                }));
            }
        };

        const validateForm = () => {
            const newErrors = {};
            if (!formData.title.trim()) newErrors.title = 'Title is required';
            if (!formData.description.trim()) newErrors.description = 'Description is required';
            if (!formData.quantity) newErrors.quantity = 'Quantity is required';
            if (!formData.category) newErrors.category = 'Category is required';
            if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
            if (!formData.location) newErrors.location = 'Location is required';
            if (formData.type === 'trade' && !formData.tradePreference) {
                newErrors.tradePreference = 'Trade preference is required for trade listings';
            }
            
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (validateForm()) {
                try {
                    await onSubmit(formData);
                } catch (error) {
                    console.error('Form submission error:', error);
                }
            }
        };

        return (
            <form data-name="food-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        error={errors.title}
                        required
                    />

                    <Input
                        label="Category"
                        name="category"
                        type="select"
                        value={formData.category}
                        onChange={handleChange}
                        error={errors.category}
                        required
                        options={[
                            { value: '', label: 'Select category' },
                            { value: 'produce', label: 'Fresh Produce' },
                            { value: 'dairy', label: 'Dairy' },
                            { value: 'bakery', label: 'Bakery' },
                            { value: 'pantry', label: 'Pantry Items' },
                            { value: 'meat', label: 'Meat & Poultry' },
                            { value: 'prepared', label: 'Prepared Foods' }
                        ]}
                    />

                    <div className="md:col-span-2">
                        <Input
                            label="Description"
                            name="description"
                            type="textarea"
                            value={formData.description}
                            onChange={handleChange}
                            error={errors.description}
                            required
                        />
                    </div>

                    <Input
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                        error={errors.quantity}
                        required
                    />

                    <Input
                        label="Unit"
                        name="unit"
                        type="select"
                        value={formData.unit}
                        onChange={handleChange}
                        options={[
                            { value: 'kg', label: 'Kilograms (kg)' },
                            { value: 'g', label: 'Grams (g)' },
                            { value: 'l', label: 'Liters (L)' },
                            { value: 'ml', label: 'Milliliters (mL)' },
                            { value: 'items', label: 'Items' }
                        ]}
                    />

                    <Input
                        label="Expiry Date"
                        name="expiryDate"
                        type="date"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        error={errors.expiryDate}
                        required
                    />

                    <Input
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        error={errors.location}
                        required
                        icon={<i className="fas fa-map-marker-alt"></i>}
                    />

                    <Input
                        label="Listing Type"
                        name="type"
                        type="select"
                        value={formData.type}
                        onChange={handleChange}
                        options={[
                            { value: 'donation', label: 'Donation' },
                            { value: 'trade', label: 'Trade' }
                        ]}
                    />

                    {formData.type === 'trade' && (
                        <Input
                            label="Trade Preference"
                            name="tradePreference"
                            value={formData.tradePreference}
                            onChange={handleChange}
                            error={errors.tradePreference}
                            placeholder="What would you like in return?"
                        />
                    )}

                    <div className="md:col-span-2">
                        <Input
                            label="Image"
                            name="image"
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => window.history.back()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                Submitting...
                            </div>
                        ) : (
                            'Submit Listing'
                        )}
                    </Button>
                </div>
            </form>
        );
    } catch (error) {
        console.error('FoodForm component error:', error);
        reportError(error);
        return null;
    }
}
