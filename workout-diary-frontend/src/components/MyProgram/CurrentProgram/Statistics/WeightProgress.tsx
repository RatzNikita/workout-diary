import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import styles from './WeightProgress.module.css'
import {BuiltExercise} from "@component/types/workoutTypes";

const data = [
    {name: '25 may', weight: 45},
    {name: '30 may', weight: 47.5},
    {name: '25 june', weight: 47.5},
    {name: '25 june', weight: 50},
    {name: '25 june', weight: 50},
    {name: '25 june', weight: 55},
    {name: '25 july', weight: 60},
    {name: '25 may', weight: 45},
    {name: '30 may', weight: 47.5},
    {name: '25 june', weight: 47.5},
    {name: '25 june', weight: 50},
    {name: '25 june', weight: 50},
    {name: '25 june', weight: 55},
    {name: '25 july', weight: 60},
    {name: '25 may', weight: 45},
    {name: '30 may', weight: 47.5},
    {name: '25 june', weight: 47.5},
    {name: '25 june', weight: 50},
    {name: '25 june', weight: 50},
    {name: '25 june', weight: 55},
    {name: '25 july', weight: 60},
    {name: '25 may', weight: 45},
    {name: '30 may', weight: 47.5},
    {name: '25 june', weight: 47.5},
    {name: '25 june', weight: 50},
    {name: '25 june', weight: 50},
    {name: '25 june', weight: 55},
    {name: '25 july', weight: 60},
];

interface WeightProgressProps {
    exercises: BuiltExercise[],
}

export const WeightProgress = ({exercises}: WeightProgressProps) => {

    return (
        <div>
            {exercises.map((ex) => {
                return (<div className={styles.container} key={ex.exercise.name}>
                        <h4 className={styles.exerciseTitle}>{ex.exercise.name}</h4>
                        <LineChart width={600} height={300} data={data}
                                   margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                            <Line type="monotone" dataKey="weight" stroke="#8884d8"/>
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                            <XAxis minTickGap={20} dataKey={"name"}/>
                            <YAxis type="number" domain={['dataMin - 10', 'dataMax + 10']}/>
                            <Tooltip/>
                        </LineChart>
                    </div>
                )
            })}
        </div>
    )

}