import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './personal.css';
import { useTranslation } from 'react-i18next';

const Personal = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [selections, setSelections] = useState({});

    const handleDiscard = () => {
        setSelections({});
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = false);
    };

    const handleNext = () => {
        navigate('/display');
    };

    return (
        <div className="personal-container">
            <div className="personal-left"></div>
            <div className="personal-right">
                <h1>{t('personalization')}</h1>
                
                <div className="blocks-container">
                    {/* Block 1 */}
                    <div className="preference-block">
                        <h3>{t('mainReason')}</h3>
                        <div className="checkbox-group">
                            <div className="checkbox-item">
                                <input type="checkbox" id="location1" />
                                <label htmlFor="location1">{t('studyWork')}</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="location2" />
                                <label htmlFor="location2">{t('dating')}</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="location3" />
                                <label htmlFor="location3">{t('relaxing')}</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="location4" />
                                <label htmlFor="location4">{t('meetingFriends')}</label>
                            </div>
                        </div>
                    </div>

                    {/* Block 2 */}
                    <div className="preference-block">
                        <h3>{t('preferredSpace')}</h3>
                        <div className="checkbox-group">
                            <div className="checkbox-item">
                                <input type="checkbox" id="time1" />
                                <label htmlFor="time1">{t('quiet')}</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="time2" />
                                <label htmlFor="time2">{t('bustling')}</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="time3" />
                                <label htmlFor="time3">{t('outdoorSeating')}</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="time4" />
                                <label htmlFor="time4">{t('luxurious')}</label>
                            </div>
                        </div>
                    </div>

                    {/* Block 3 */}
                    <div className="preference-block">
                        <h3>{t('desiredFacilities')}</h3>
                        <div className="checkbox-group">
                            <div className="checkbox-item">
                                <input type="checkbox" id="type1" />
                                <label htmlFor="type1">{t('freeWiFi')}</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="type2" />
                                <label htmlFor="type2">{t('powerOutlet')}</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="type3" />
                                <label htmlFor="type3">{t('privateRoom')}</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="type4" />
                                <label htmlFor="type4">{t('parkingLot')}</label>
                            </div>
                        </div>
                    </div>

                    {/* Block 4 */}
                    <div className="preference-block">
                        <h3>{t('favoriteDrinks')}</h3>
                        <div className="checkbox-group">
                            <div className="checkbox-item">
                                <input type="checkbox" id="food1" />
                                <label htmlFor="food1">{t('traditionalCoffee')}</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="food2" />
                                <label htmlFor="food2">{t('mixedCoffee')}</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="food3" />
                                <label htmlFor="food3">{t('otherDrinks')}</label>
                            </div>
                        </div>
                    </div>

                    {/* Block 5 */}
                    <div className="preference-block">
                        <h3>{t('pricePreference')}</h3>
                        <div className="checkbox-group">
                            <div className="checkbox-item">
                                <input type="checkbox" id="atmos1" />
                                <label htmlFor="atmos1">{t('under30k')}</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="atmos2" />
                                <label htmlFor="atmos2">{t('from30kTo50k')}</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="atmos3" />
                                <label htmlFor="atmos3">{t('over50k')}</label>
                            </div>
                        </div>
                    </div>

                    {/* Block 6 */}
                    <div className="preference-block">
                        <h3>{t('preferredTime')}</h3>
                        <div className="checkbox-group">
                            <div className="checkbox-item">
                                <input type="checkbox" id="habit1" />
                                <label htmlFor="habit1">{t('morning')}</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="habit2" />
                                <label htmlFor="habit2">{t('afternoon')}</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="habit3" />
                                <label htmlFor="habit3">{t('evening')}</label>
                            </div>
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
