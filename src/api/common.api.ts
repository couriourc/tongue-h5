import requester from "@/api/requester";

export function getPrivacy() {
    return requester.get("/privacy.txt", null, {
        from_public: true
    });
}
