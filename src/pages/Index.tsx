
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import CodePopup from '@/components/CodePopup';

const Index = () => {
  const navigate = useNavigate();
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showEnterInput, setShowEnterInput] = useState(false);
  const [enterCode, setEnterCode] = useState('');

  const handleCreateCode = (code: string) => {
    localStorage.setItem('currentCode', code);
    navigate('/main-image');
  };

  const handleEnterCode = () => {
    if (enterCode.trim()) {
      localStorage.setItem('currentCode', enterCode.trim());
      navigate('/main-image');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Code & Image Manager
        </h1>
        
        <div className="space-y-6">
          <Button 
            onClick={() => setShowCreatePopup(true)}
            className="w-full py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Create Code
          </Button>

          <Button 
            onClick={() => setShowEnterInput(!showEnterInput)}
            variant="outline"
            className="w-full py-4 text-lg border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300"
          >
            Enter Code
          </Button>

          {showEnterInput && (
            <div className="space-y-4 mt-6 p-4 bg-gray-50 rounded-lg">
              <Input
                placeholder="Enter existing code"
                value={enterCode}
                onChange={(e) => setEnterCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleEnterCode()}
                className="text-center"
              />
              <Button 
                onClick={handleEnterCode}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Access Project
              </Button>
            </div>
          )}
        </div>
      </div>

      <CodePopup
        isOpen={showCreatePopup}
        onClose={() => setShowCreatePopup(false)}
        onSubmit={handleCreateCode}
        title="Create New Code"
      />
    </div>
  );
};

export default Index;
