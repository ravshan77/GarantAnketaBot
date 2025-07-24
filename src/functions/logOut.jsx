export default function logOut(){
    localStorage.clear();
    sessionStorage.clear()
    document.location.reload();
}