import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import './personal.css';
import { useTranslation } from 'react-i18next';

const Personal = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [selections, setSelections] = useState({});
    const [preferences, setPreferences] = useState({
        personalization: true,
        priceRange: 'low', // Matches backend enum
        mainReason: [],
        preferredSpace: [],
        desiredFacilities: [],
        favoriteDrinks: [],
        preferredTime: []
    });

    const updatePreferences = async (newPreferences) => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}users/preference/update`, {
                userId: user.id,
                newUserPreference: {
                    personalization: newPreferences.personalization,
                    priceRange: newPreferences.priceRange,
                    // Add other fields as needed by your backend DTO
                }
            });
            
            if (response.data) {
                setPreferences(newPreferences);
            }
        } catch (error) {
            console.error('Error updating preferences:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePreferenceChange = (category, value) => {
        const newPreferences = { ...preferences };
        
        if (category === 'priceRange') {
            newPreferences.priceRange = value;
        } else {
            // Toggle array values for other categories
            const index = newPreferences[category].indexOf(value);
            if (index === -1) {
                newPreferences[category].push(value);
            } else {
                newPreferences[category].splice(index, 1);
            }
        }

        updatePreferences(newPreferences);
    };

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                setLoading(true);
                // Assuming you have an endpoint to get user preferences
                const response = await axios.get(`${API_BASE_URL}users/preference/${user.id}`);
                if (response.data) {
                    setPreferences(response.data);
                }
            } catch (error) {
                console.error('Error fetching preferences:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchPreferences();
        }
    }, [user]);

    const handleDiscard = () => {
        setSelections({});
        setPreferences({
            personalization: true,
            priceRange: 'low', // Matches backend enum
            mainReason: [],
            preferredSpace: [],
            desiredFacilities: [],
            favoriteDrinks: [],
            preferredTime: []
        });
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = false);
    };

    const handleNext = async () => {
        try {
            // Ensure preferences are saved before navigating
            await updatePreferences(preferences);
            navigate('/display');
        } catch (error) {
            console.error('Error saving preferences:', error);
        }
    };

    // Protect route if no user
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div className="personal-container">
            {loading && <div className="loading-overlay">Loading...</div>}
            <div className="personal-left"></div>
            <div className="personal-right">
                <h1>{t('personalization')}</h1>
                
                <div className="blocks-container">
                    {/* Block 1 - Main Reason */}
                    <div className="preference-block">
                        <h3>{t('mainReason')}</h3>
                        <div className="checkbox-group">
                            {['studyWork', 'dating', 'relaxing', 'meetingFriends'].map(reason => (
                                <div className="checkbox-item" key={reason}>
                                    <input
                                        type="checkbox"
                                        id={reason}
                                        checked={preferences.mainReason.includes(reason)}
                                        onChange={() => handlePreferenceChange('mainReason', reason)}
                                    />
                                    <label htmlFor={reason}>{t(reason)}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Block 2 */}
                    <div className="preference-block">
                        <h3>{t('preferredSpace')}</h3>
                        <div className="checkbox-group">
                            {['quiet', 'bustling', 'outdoorSeating', 'luxurious'].map(space => (
                                <div className="checkbox-item" key={space}>
                                    <input
                                        type="checkbox"
                                        id={space}
                                        checked={preferences.preferredSpace.includes(space)}
                                        onChange={() => handlePreferenceChange('preferredSpace', space)}
                                    />
                                    <label htmlFor={space}>{t(space)}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Block 3 */}
                    <div className="preference-block">
                        <h3>{t('desiredFacilities')}</h3>
                        <div className="checkbox-group">
                            {['freeWiFi', 'powerOutlet', 'privateRoom', 'parkingLot'].map(facility => (
                                <div className="checkbox-item" key={facility}>
                                    <input
                                        type="checkbox"
                                        id={facility}
                                        checked={preferences.desiredFacilities.includes(facility)}
                                        onChange={() => handlePreferenceChange('desiredFacilities', facility)}
                                    />
                                    <label htmlFor={facility}>{t(facility)}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Block 4 */}
                    <div className="preference-block">
                        <h3>{t('favoriteDrinks')}</h3>
                        <div className="checkbox-group">
                            {['traditionalCoffee', 'mixedCoffee', 'otherDrinks'].map(drink => (
                                <div className="checkbox-item" key={drink}>
                                    <input
                                        type="checkbox"
                                        id={drink}
                                        checked={preferences.favoriteDrinks.includes(drink)}
                                        onChange={() => handlePreferenceChange('favoriteDrinks', drink)}
                                    />
                                    <label htmlFor={drink}>{t(drink)}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Block 5 - Price Range */}
                    <div className="preference-block">
                        <h3>{t('pricePreference')}</h3>
                        <div className="checkbox-group">
                            {[
                                { value: 'low', label: 'under30k' },
                                { value: 'medium', label: 'from30kTo50k' },
                                { value: 'high', label: 'over50k' }
                            ].map(({ value, label }) => (
                                <div className="checkbox-item" key={`price-${value}`}>
                                    <input 
                                        type="checkbox" 
                                        id={`price-${value}`}
                                        checked={preferences.priceRange === value}
                                        onChange={() => handlePreferenceChange('priceRange', value)}
                                    />
                                    <label htmlFor={`price-${value}`}>{t(label)}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Block 6 */}
                    <div className="preference-block">
                        <h3>{t('preferredTime')}</h3>
                        <div className="checkbox-group">
                            {['morning', 'afternoon', 'evening'].map(time => (
                                <div className="checkbox-item" key={time}>
                                    <input
                                        type="checkbox"
                                        id={time}
                                        checked={preferences.preferredTime.includes(time)}
                                        onChange={() => handlePreferenceChange('preferredTime', time)}
                                    />
                                    <label htmlFor={time}>{t(time)}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="button-container">
                    <button className="discard-button" onClick={handleDiscard}>{t('discard')}</button>
                    <button className="next-button" onClick={handleNext}>{t('next')}</button>
                </div>
            </div>
        </div>
    );
};

export default Personal;
