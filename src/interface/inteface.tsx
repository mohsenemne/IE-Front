export interface ProjectInfo {
    budget: number
    deadline: number
    description: string
    id: string
    imageURL: string
    skills: []
    title: string
    creationDate: string
    winner: {name: string}
}

export interface Skill{
    name: string
    points: number
    endorsed?: boolean
}
