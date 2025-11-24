export default function arrayFrequency(arr : number[], num : number){
    return arr.reduce((count, val) => (val === num ? count + 1 : count), 0);
}