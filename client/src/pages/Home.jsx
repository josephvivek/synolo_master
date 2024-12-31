import React from "react";
import Navbar from '../components/Navbar'
import '../styles/Home.css'


function Home(){
    const projects = [
        { id: 1, name: "Project 1"},
        { id: 2, name: "Project 2" },
        { id: 3, name: "Project 3" },
        { id: 4, name: "Project 3" },
        { id: 5, name: "Project 3" },
        { id: 6, name: "Project 3" },

      ];
      

      const tasks = [
        { id: 1, name: "Task 1", project: "Project Alpha", deadline: "2024-01-10" },
        { id: 2, name: "Task 2", project: "Project Beta", deadline: "2024-01-15" },
        { id: 3, name: "Task 3", project: "Project Gamma", deadline: "2024-01-20" },
        { id: 4, name: "Task 4", project: "Project Delta", deadline: "2024-01-25" },
        { id: 5, name: "Task 4", project: "Project Epsilon", deadline: "2024-01-30" },
        { id: 6, name: "Task 4", project: "Project Zeta", deadline: "2024-02-05" },
        { id: 7, name: "Task 4", project: "Project Eta", deadline: "2024-02-10" },
      ];
      
      


    return(
        <>
            <div className="container">
                <Navbar/>
                <div className="content">
                    <div className="left-content">
                        <p className="heading">My Projects</p>
                        <div className="project-list-container">
                            <div className="project-list">
                                {projects.map((item) => {
                                    return <div className="project-card" key={item.id}>{item.name}</div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="right-content">
                        <p className="heading">My Tasks</p>
                        <div className="task-list-container">
                        <div className="task-list">
                            {tasks.map((item) => {
                                return <div className="task-card" key={item.id}>
                                    <p className="task-name">{item.name}</p>
                                    <p className="deadline">{item.deadline}</p>
                                    <p className="project-name">{item.project}</p>
                                </div>
                            })}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home