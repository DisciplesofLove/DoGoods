function BulkUploadForm({
    initialData = null,
    onSubmit,
    loading = false
}) {
    try {
        const [formData, setFormData] = React.useState({
            csvFile: null,
            imageFiles: [],
            location: '',
            notes: '',
            defaultType: 'donation', // 'donation' or 'trade'
            ...initialData
        });

        const [errors, setErrors] = React.useState({});
        const [previewItems, setPreviewItems] = React.useState([]);

        const handleChange = (e) => {
            const { name, value, type, files } = e.target;
            
            if (type === 'file' && name === 'csvFile') {
                const file = files[0];
                if (file) {
                    setFormData(prev => ({
                        ...prev,
                        csvFile: file
                    }));
                    
                    // Process CSV preview
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        try {
                            const csvData = parseCsv(event.target.result);
                            setPreviewItems(csvData.slice(0, 3)); // Show first 3 items as preview
                        } catch (error) {
                            console.error('CSV parsing error:', error);
                            setErrors(prev => ({
                                ...prev,
                                csvFile: 'Invalid CSV format. Please check the template.'
                            }));
                        }
                    };
                    reader.readAsText(file);
                }
            } else if (type === 'file' && name === 'imageFiles') {
                const selectedFiles = Array.from(files);
                setFormData(prev => ({
                    ...prev,
                    imageFiles: selectedFiles
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    [name]: value
                }));
            }
            
            // Clear error when field is modified
            if (errors[name]) {
                setErrors(prev => ({
                    ...prev,
                    [name]: null
                }));
            }
        };

        const validateForm = () => {
            const newErrors = {};
            if (!formData.csvFile) {
                newErrors.csvFile = 'CSV file is required';
            }
            if (!formData.location) {
                newErrors.location = 'Location is required';
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

        // Simple CSV parser (in a real app, use a proper CSV library)
        const parseCsv = (csvText) => {
            const lines = csvText.split('\n');
            const headers = lines[0].split(',').map(h => h.trim());
            
            return lines.slice(1).filter(line => line.trim().length > 0).map(line => {
                const values = line.split(',').map(v => v.trim());
                const item = {};
                
                headers.forEach((header, index) => {
                    item[header] = values[index] || '';
                });
                
                return item;
            });
        };

        const downloadTemplate = () => {
            const csvContent = "title,description,quantity,unit,expiryDate,category\nOrganic Apples,Fresh locally grown apples,5,kg,2023-12-31,produce\nSourdough Bread,Freshly baked this morning,2,loaves,2023-12-25,bakery";
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'food_listings_template.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };

        return (
            <form data-name="bulk-upload-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <i className="fas fa-info-circle text-blue-500"></i>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">Bulk Upload Instructions</h3>
                            <div className="mt-2 text-sm text-blue-700">
                                <p>Upload multiple food items at once using our CSV template. All items will share the same location and listing type.</p>
                                <button 
                                    type="button"
                                    onClick={downloadTemplate}
                                    className="mt-2 text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                >
                                    <i className="fas fa-download mr-1"></i>
                                    Download CSV Template
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <Input
                            label="CSV File with Food Items"
                            name="csvFile"
                            type="file"
                            onChange={handleChange}
                            accept=".csv"
                            error={errors.csvFile}
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Input
                            label="Bulk Images (Optional)"
                            name="imageFiles"
                            type="file"
                            onChange={handleChange}
                            accept="image/*"
                            multiple
                            helperText="You can upload multiple images that will be distributed across your listings"
                        />
                    </div>

                    <Input
                        label="Listing Type"
                        name="defaultType"
                        type="select"
                        value={formData.defaultType}
                        onChange={handleChange}
                        options={[
                            { value: 'donation', label: 'Donation' },
                            { value: 'trade', label: 'Trade' }
                        ]}
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

                    <div className="md:col-span-2">
                        <Input
                            label="Additional Notes"
                            name="notes"
                            type="textarea"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Any additional information about this batch of items"
                        />
                    </div>
                </div>

                {previewItems.length > 0 && (
                    <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b">
                            <h3 className="text-sm font-medium text-gray-700">CSV Preview (First 3 Items)</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {Object.keys(previewItems[0]).map((header, index) => (
                                            <th 
                                                key={index}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {previewItems.map((item, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {Object.values(item).map((value, cellIndex) => (
                                                <td 
                                                    key={cellIndex}
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                >
                                                    {value}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

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
                                Uploading...
                            </div>
                        ) : (
                            'Upload Listings'
                        )}
                    </Button>
                </div>
            </form>
        );
    } catch (error) {
        console.error('BulkUploadForm component error:', error);
        reportError(error);
        return null;
    }
}
