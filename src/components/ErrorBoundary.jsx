import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary поймал ошибку:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Что-то пошло не так 😔</h2>
          <p>Попробуйте перезагрузить страницу.</p>
          <button onClick={() => window.location.reload()}>Обновить</button>
        </div>
      );
    }
    return this.props.children;
  }
}