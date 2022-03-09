/* eslint-disable */
import HomeScreen from "../screens/HomeScreen";
import ScoreScreen from "../screens/ScoreScreen";
import { ContainerBatalha } from  '../components/containerBatalha'

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeScreen,
    },
    {
        path: "/game",
        name: "Game",
        component: ContainerBatalha,
    },
    {
        path: "/score",
        name: "Ranking",
        component: ScoreScreen,
    }
];

export default routes;