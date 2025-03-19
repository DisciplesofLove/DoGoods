function CategoryCard({
    category,
    onClick
}) {
    try {
        const handleClick = () => {
            // Navigate to find page with category filter
            window.location.href = `/find?category=${category.id}`;
        };

        return (
            <div 
                data-name="category-card"
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
                onClick={handleClick}
            >
                <div className="relative h-48">
                    <img 
                        src={category.image} 
                        alt={category.title} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                            <h3 className="text-2xl font-bold mb-1">{category.title}</h3>
                            <p className="mb-2">{category.description}</p>
                            <div className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                                {category.itemCount} items
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CategoryCard component error:', error);
        reportError(error);
        return null;
    }
}
