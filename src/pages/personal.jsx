import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './personal.css';

const Personal = () => {
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
                <h1>Personalization</h1>
                
                <div className="blocks-container">
                    {/* Block 1 */}
                    <div className="preference-block">
                        <h3>Lí do chính khi bạn uống cà phê?</h3>
                        <div className="checkbox-group">
                            <div className="checkbox-item">
                                <input type="checkbox" id="location1" />
                                <label htmlFor="location1">Học tập/làm việc</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="location2" />
                                <label htmlFor="location2">Hẹn hò</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="location3" />
                                <label htmlFor="location3">Thư giãn</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="location4" />
                                <label htmlFor="location4">Gặp gỡ bạn bè</label>
                            </div>
                        </div>
                    </div>

                    {/* Block 2 */}
                    <div className="preference-block">
                        <h3>Không gian mà bạn ưa thích?</h3>
                        <div className="checkbox-group">
                            <div className="checkbox-item">
                                <input type="checkbox" id="time1" />
                                <label htmlFor="time1">Yên tĩnh</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="time2" />
                                <label htmlFor="time2">Náo nhiệt</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="time3" />
                                <label htmlFor="time3">Ngồi ngoài trời</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="time4" />
                                <label htmlFor="time4">Sang trọng</label>
                            </div>
                        </div>
                    </div>

                    {/* Block 3 */}
                    <div className="preference-block">
                        <h3>Tiện nghi bạn mong muốn?</h3>
                        <div className="checkbox-group">
                            <div className="checkbox-item">
                                <input type="checkbox" id="type1" />
                                <label htmlFor="type1">Wi-Fi miễn phí</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="type2" />
                                <label htmlFor="type2">Ổ cắm điện</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="type3" />
                                <label htmlFor="type3">Phòng riêng</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="type4" />
                                <label htmlFor="type4">Bãi đỗ xe</label>
                            </div>
                        </div>
                    </div>

                    {/* Block 4 */}
                    <div className="preference-block">
                        <h3>Đồ uống ưa thích?</h3>
                        <div className="checkbox-group">
                            <div className="checkbox-item">
                                <input type="checkbox" id="food1" />
                                <label htmlFor="food1">Cafe truyền thống</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="food2" />
                                <label htmlFor="food2">Cafe mix</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="food3" />
                                <label htmlFor="food3">Đồ uống khác</label>
                            </div>
                        </div>
                    </div>

                    {/* Block 5 */}
                    <div className="preference-block">
                        <h3>Mức giá mong muốn?</h3>
                        <div className="checkbox-group">
                            <div className="checkbox-item">
                                <input type="checkbox" id="atmos1" />
                                <label htmlFor="atmos1">Dưới 30.000đ</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="atmos2" />
                                <label htmlFor="atmos2">30.000đ - 50.000đ</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="atmos3" />
                                <label htmlFor="atmos3">Trên 50.000đ</label>
                            </div>
                        </div>
                    </div>

                    {/* Block 6 */}
                    <div className="preference-block">
                        <h3>Thời gian bạn thích?</h3>
                        <div className="checkbox-group">
                            <div className="checkbox-item">
                                <input type="checkbox" id="habit1" />
                                <label htmlFor="habit1">Buổi sáng</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="habit2" />
                                <label htmlFor="habit2">Buổi chiều</label>
                            </div>
                            <div className="checkbox-item">
                                <input type="checkbox" id="habit3" />
                                <label htmlFor="habit3">Buổi tối</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="button-container">
                    <button className="discard-button" onClick={handleDiscard}>Discard</button>
                    <button className="next-button" onClick={handleNext}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Personal;
