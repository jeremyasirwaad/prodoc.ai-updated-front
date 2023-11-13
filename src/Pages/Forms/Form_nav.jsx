import React from "react";
import logo from "../../assets/prodoc.png";

export const Form_nav = () => {
	return (
		<div>
			<div className="navbar">
				<div className="nav-logo">
					<img src={logo} alt="" />
					<div className="nav-title">
						<span>Prodoc.ai</span>
						<span className="beta-tag">Alpha</span>
					</div>
				</div>
			</div>
            <div className="formtype">
                <div className="form_card">
                    
                </div>
                <div className="form_card"></div>
            </div>
		</div>
	);
};
