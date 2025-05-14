(function () {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
        const [url, config] = args;

        // Intercept the login response
        if (url.includes("/api/Auth/login")) {
            const response = await originalFetch(...args);
            const clone = response.clone();

            try {
                const json = await clone.json();
                if (json.token) {
                    const token = `Bearer ${json.token}`;
                    localStorage.setItem("swagger_jwt_token", token);

                    // Automatically authorize in Swagger UI
                    window.ui.preauthorizeApiKey("Bearer", token);
                    console.log("✅ Swagger authorized with token");
                }
            } catch (e) {
                console.warn("Failed to parse login token", e);
            }

            return response;
        }

        return originalFetch(...args);
    };
})();
