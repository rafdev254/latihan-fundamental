"use client"
import { useState } from "react";


function DaftarTugas(
    { items, onDeleteTask }: 
    { 
        items: string[], 
        onDeleteTask: (value: number) => void
    }){

    return(
        <div>

            <ul>
                {items.map((m,i) => <li key={i}>{m} <button onClick={() => onDeleteTask(i)}>Hapus</button></li>)}
            </ul>
        </div>
    )
}

export default function TaskTrackerPage() {

    const [inputState, setInputState] = useState("");
    const [taskLists, setTaskLists] = useState<string[]>([]);

    function addTask() {
        
        const inputValue = inputState.trim();
        if(inputValue !== ""){
            setTaskLists([...taskLists,inputValue]);
            setInputState("");
        }
    }

    function onDeleteTask(indexToDelete: number){
        setTaskLists(taskLists.filter((_, index) => index !== indexToDelete));
    }


    return (
        <main style={{ padding: "20px" }}>
            <h2>Aplikasi Task Tracker Sederhana</h2>

            <div>
                <input
                    type="text"
                    value={inputState} 
                    onChange={(e) => setInputState(e.target.value)} 
                    placeholder="Ketik nama tugas..."/>
                <button onClick={addTask}>Submit</button>
            </div>

            <DaftarTugas
                items={taskLists}
                onDeleteTask={onDeleteTask}
            />

        </main>
    );
}