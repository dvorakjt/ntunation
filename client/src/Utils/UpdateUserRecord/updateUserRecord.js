//import API Util
import API from '../../Utils/API';

//import global user store
import { useUserStoreContext } from '../../Utils/UserStore';

const [state, dispatch] = useUserStoreContext();
const user = JSON.parse(localStorage.getItem('lsUser'));

const updateUserRecord = (category, correct, wrong) => {
    API.updateUser({
        email: state.user.email,
        category: category,
        attempts: Number(user[category].attempts) + 1,
        correct: Number(user[category].correct) + correct,
        wrong: Number(user[category].wrong) + wrong,
        introDone: false,
        practiceDone: false,
        quizDone: false
    })
    dispatch({
        type: "UPDATE",
        category: category,
        updatedData: {
            attempts: Number(user[category]).attempts + 1,
            correct: Number(user[category].correct) + correct,
            wrong: Number(user[category].wrong) + wrong,
            introDone: false,
            practiceDone: false,
            quizDone: false
        }
    });
    localStorage.setItem("lsUser", JSON.stringify(state.user));
}

export default updateUserRecord;