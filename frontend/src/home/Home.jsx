import Button from "../shared/components/form-elements/Button";
import "./home.css";

const Home = () => {
    return (
        <div className="home">
            <div>Hello!👋</div>
            <div>Everybody takes a photo before start to eat, right? 📷</div>
            <div>Now you can share the photo 💻</div>
            <div>and</div>
            <div>see what other users eat and where! 🤓</div>
            <div>So which plate going to be the next for you? 🍝</div>
            <Button inverse to="/auth">
                Sign Up for Free
            </Button>
        </div>
    );
};

export default Home;
