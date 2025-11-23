export type PercentageProps = {
      part : number,
      total : number
}

export default function percentage({part = 0, total = 0} : PercentageProps) : string{
      const res = (part / total) * 100;

      return res + '%'
}