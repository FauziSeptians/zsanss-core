export default function maskEmail (email : string){
      let [name, domain] = email.split("@");
      let masked = "*".repeat(name.length - 1);
      
      return name[0] + masked + domain;
}