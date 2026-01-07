"use client";

import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function DashboardTour() {
  useEffect(() => {
    // Check if tour has been seen
    const hasSeenTour = localStorage.getItem("focusflow_tour_seen");
    if (hasSeenTour) return;

    // Initialize Driver
    const driverObj = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      doneBtnText: "Finish Tour",
      nextBtnText: "Next Step",
      prevBtnText: "Previous",
      popoverClass: "driverjs-theme",
      onDestroyed: () => {
        localStorage.setItem("focusflow_tour_seen", "true");
      },
      steps: [
        {
          element: "#nav-projects",
          popover: {
            title: "Project & Client Management",
            description: "Switch between managing your Projects and your Client database using these tabs.",
            side: "right",
            align: "start",
          },
        },
        {
          element: "#btn-create-client",
          popover: {
            title: "Create New Client",
            description: "Clicking here opens a form to add a new client to your database. You'll need to enter their name and email.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#btn-create-project",
          popover: {
            title: "Create New Project",
            description: "Once you have clients, use this button to start a new project. You can assign it to a client, set a title, and define the invoice amount.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#first-project-card",
          popover: {
            title: "Project Cards",
            description: "This card displays key project details: Status, Amount, and Client. Use the actions at the bottom to Edit, Delete, or Copy the project link.",
            side: "left",
            align: "start",
          },
        },
      ],
    });

    // Start tour after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      driverObj.drive();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return null; // This component handles the side-effect only
}
