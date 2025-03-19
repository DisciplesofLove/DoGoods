function AssistantButton({ onClick }) {
    try {
        return (
            <button
                data-name="assistant-button"
                onClick={onClick}
                className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 transition-colors z-40"
                aria-label="Open AI Assistant"
            >
                <i className="fas fa-robot text-xl"></i>
            </button>
        );
    } catch (error) {
        console.error('AssistantButton component error:', error);
        reportError(error);
        return null;
    }
}
