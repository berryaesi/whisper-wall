
document.addEventListener('DOMContentLoaded', function() {
    // Toggle nickname field visibility
    const useNicknameCheckbox = document.getElementById('useNickname');
    const nicknameField = document.getElementById('nicknameField');
    if (useNicknameCheckbox && nicknameField) {
        useNicknameCheckbox.addEventListener('change', function() {
            nicknameField.classList.toggle('hidden', !this.checked);
        });
    }

    // Handle form submission on home page
const confessionForm = document.getElementById('confessionForm');
    if (confessionForm) {
        confessionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const confessionText = document.getElementById('confessionText').value.trim();
            
            if (confessionText) {
                // Save to localStorage
                const confessions = JSON.parse(localStorage.getItem('confessions') || '[]');
                const useNickname = document.getElementById('useNickname').checked;
                const nickname = useNickname ? document.getElementById('nicknameInput').value.trim() || 'Anonymous' : 'Anonymous';
                
                confessions.push({
                    text: confessionText,
                    timestamp: new Date().toISOString(),
                    nickname: nickname
});
                localStorage.setItem('confessions', JSON.stringify(confessions));
                
                // Show success message
                const successMessage = document.getElementById('successMessage');
                successMessage.classList.remove('hidden');
                
                // Reset form
                confessionForm.reset();
                
                // Hide message after 3 seconds
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 3000);
            }
        });
    }
    
    // Load confessions on wall page
    const confessionsContainer = document.getElementById('confessionsContainer');
    if (confessionsContainer) {
        const confessions = JSON.parse(localStorage.getItem('confessions') || '[]');
        
        if (confessions.length === 0) {
            confessionsContainer.innerHTML = `
                <div class="col-span-2 text-center py-10">
                    <i data-feather="frown" class="w-12 h-12 mx-auto text-gray-400 mb-4"></i>
                    <p class="text-gray-500">No confessions yet. Be the first to share!</p>
                </div>
            `;
        } else {
            confessions.forEach(confession => {
                const confessionElement = document.createElement('div');
                confessionElement.className = 'confession-card bg-white rounded-lg shadow-md p-6';
                confessionElement.innerHTML = `
                    <div class="flex items-start">
                        <div class="bg-pink-100 p-3 rounded-full mr-4">
                            <i data-feather="user" class="text-pink-500"></i>
</div>
                        <div>
                            <p class="text-gray-700 mb-2">${confession.text}</p>
                            <p class="text-gray-400 text-sm">Posted by ${confession.nickname}</p>
</div>
                    </div>
                `;
                confessionsContainer.appendChild(confessionElement);
            });
        }
    }
    
    // Replace feather icons
    feather.replace();
});