export default class Error404View {
    static render() {
        window.scrollTo({
            top: 0,
        });
        return `
            <div class="error">
            <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center">
                <h1 class="display-1 fw-bold">404</h1>
                <p class="fs-3"> <span style="color:#d50952;">Opps!</span> Page not found.</p>
                <p class="lead">
                    The page you’re looking for doesn’t exist.
                  </p>
                <a href="/#/" ><button type="button" class="btn" style="background-color:#d4c893">Go Home</button></a>
            </div>
        </div>
            </div>
        `;
    }
}