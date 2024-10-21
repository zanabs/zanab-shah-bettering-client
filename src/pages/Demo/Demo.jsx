import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import "./Demo.scss";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

const options = [
  "Select option",
  "Post-secondary Education",
  "Healthcare",
  "Municipal Government",
];

export const Demo = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleCard, setVisibleCard] = useState(null); // New state to track the visible card
  const [isCardVisible, setIsCardVisible] = useState(false); // New state to hide other content
  const navigate = useNavigate();

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    handleToggle;
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    console.log("hgfchgfh");
  };

  const handleEnterDemoClick = () => {
    if (selectedIndex === 0) {
      alert("Please select where you work");
    } else {
      setIsCardVisible(true); // Set to true when a card is selected
      if (selectedIndex === 1) {
        setVisibleCard("post-secondary-institution");
        document
          .getElementById("post-secondary-institution")
          .scrollIntoView({ behavior: "smooth" });
      } else if (selectedIndex === 2) {
        setVisibleCard("healthcare");
        document
          .getElementById("healthcare")
          .scrollIntoView({ behavior: "smooth" });
      } else if (selectedIndex === 3) {
        setVisibleCard("municipalities");
        document
          .getElementById("municipalities")
          .scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Hide the main content when a card is visible */}
      {!isCardVisible && (
        <div className="main-content">
          <div className="main-content__demo-content">
            <div className="main-content__demo-options">
              <div>
                <p>I work in</p>
              </div>
              <div>
                <ButtonGroup
                  variant="contained"
                  ref={anchorRef}
                  aria-label="Button group with a nested menu"
                >
                  <Button onClick={handleClick}>
                    {options[selectedIndex]}
                  </Button>
                  <Button
                    size="small"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="Municipal Government"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                  >
                    <ArrowDropDownIcon />
                  </Button>
                </ButtonGroup>
                <Popper
                  sx={{ zIndex: 1 }}
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList id="split-button-menu" autoFocusItem>
                            {options.map((option, index) => (
                              <MenuItem
                                key={option}
                                selected={index === selectedIndex}
                                onClick={(event) =>
                                  handleMenuItemClick(event, index)
                                }
                              >
                                {option}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </div>
            <div>
              <Button onClick={handleEnterDemoClick}>enter demo</Button>
            </div>
          </div>
        </div>
      )}

      <div className="demo-scenarios">
        <Card
          id="healthcare"
          className={`card ${visibleCard === "healthcare" ? "visible" : ""}`}
        >
          <div className="demo-scenarios__text">
            <p className="eye-catching">
              In Canada, healthcare providers spend an average of just 13
              minutes with their patients...
            </p>
            <p className="body">
              Your scenario: You are a physician working in an ER. It is
              Thursday night and even at 11pm your waiting room is packed. Your
              next patient has the following profile:
            </p>
            <ul>
              <li>Male, early 50s</li>
              <li>Extreme tooth pain in left molar.</li>
              <li>Cause: likely a cracked or impacted tooth.</li>
              <li>Patient has no permanent address, ID or EHR.</li>
              <li>
                Patient is using the ER in lieu of primary care because he does
                not have a family doctor.
              </li>
              <li>Patient is low SeS and does not have insurance.</li>
              <li>
                The patient is also a newcomer to Canada and speaks very little
                English. His first language is punjabi.
              </li>
            </ul>
            <p>Barriers to care:</p>
            <ul>
              <li>
                Neither you nor the hospital is equipped to offer emergency
                dental services.
              </li>
              <li>
                There is a shared community resources document with a few
                low-cost dental providers in the area, but you see comments from
                your colleagues complaining that the hours of operation are out
                of date. At 11pm it would be impossible to confirm with an
                administrator what the correct hours are.
              </li>
              <li>
                You know one trusted dentist in the area, but they do not
                provide low-cost services until the following Tuesday.
              </li>
              <li>
                There is no way to confirm which providers offer translation services or have multilingual staff.
              </li>
            </ul>
          </div>
          <div className="demo-scenarios__button">
            <Button onClick={() => navigate(`/login?type=physician`)}>
              Resolve Concern
            </Button>
          </div>
        </Card>

        <Card
          id="post-secondary-institution"
          className={`card ${visibleCard === "post-secondary-institution" ? "visible" : ""}`}
        >
          <div className="demo-scenarios__text">
            <p className="eye-catching">
              In Canada, healthcare providers spend an average of just 13
              minutes with their patients...
            </p>
            <p className="body">
              Your scenario: You are a physician working in an ER. It is
              Thursday night and even at 11pm your waiting room is packed. Your
              next patient has the following profile:
            </p>
            <ul>
              <li>Male, early 50s</li>
              <li>Extreme tooth pain in left molar</li>
              <li>Cause: likely a cracked or impacted tooth</li>
              <li>Patient has no permanent address, ID or EHR</li>
              <li>
                Patient is using the ER in lieu of primary care because he does
                not have a family doctor
              </li>
              <li>Patient is low SeS and does not have insurance</li>
              <li>
                The patient is also a newcomer to Canada and speaks very little
                English. His first language is punjabi.
              </li>
            </ul>
            <p>Barriers to care:</p>
            <ul>
              <li>
                Neither you nor the hospital is equipped to offer emergency
                dental services
              </li>
              <li>
                There is a shared community resources document with a few
                low-cost dental providers in the area, but you see comments from
                your colleagues complaining that the hours of operation are out
                of date. At 11pm it would be impossible to confirm with an
                administrator what the correct hours are
              </li>
              <li>
                You know one trusted dentist in the area, but they do not
                provide low-cost services until the following Tuesday
              </li>
              <li>
                There is no way to confirm which services provide translation services or have multilingual staff
              </li>
            </ul>
          </div>
          <div className="demo-scenarios__button">
            <Button
              onClick={() => navigate(`/login?type=post-secondary-institution`)}
            >
              Resolve Concern
            </Button>
          </div>
        </Card>
        <Card
          id="municipalities"
          className={`card ${visibleCard === "municipalities" ? "visible" : ""}`}
        >
          <div className="demo-scenarios__text">
            <p className="eye-catching">
              In Canada, healthcare providers spend an average of just 13
              minutes with their patients...
            </p>
            <p className="body">
              Your scenario: You are a physician working in an ER. It is
              Thursday night and even at 11pm your waiting room is packed. Your
              next patient has the following profile:
            </p>
            <ul>
              <li>Male, early 50s</li>
              <li>Extreme tooth pain in left molar</li>
              <li>Cause: likely a cracked or impacted tooth</li>
              <li>Patient has no permanent address, ID or EHR</li>
              <li>
                Patient is using the ER in lieu of primary care because he does
                not have a family doctor
              </li>
              <li>Patient is low SeS and does not have insurance</li>
              <li>
                The patient is also a newcomer to Canada and speaks very little
                English
              </li>
            </ul>
            <p>Barriers to care:</p>
            <ul>
              <li>
                Neither you nor the hospital is equipped to offer emergency
                dental services
              </li>
              <li>
                There is a shared community resources document with a few
                low-cost dental providers in the area, but you see comments from
                your colleagues complaining that the hours of operation are out
                of date. At 11pm it would be impossible to confirm with an
                administrator what the correct hours are
              </li>
              <li>
                You know one trusted dentist in the area, but they do not
                provide low-cost services until the following Tuesday
              </li>
            </ul>
          </div>
          <div className="demo-scenarios__button">
            <Button onClick={() => navigate(`/login?type=municipal`)}>
              Resolve Concern
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};
