import { Prisma, PrismaClient } from '@prisma/client'
import { fakerJA as faker } from '@faker-js/faker'
const prisma = new PrismaClient()
const Project: Prisma.ProjectCreateInput[] = [
  {
    id: 'example-project1',
    title: faker.company.name(),
    icon: {
      create: {
        srcPath: faker.image.url(),
        name: faker.system.fileName(),
      }
    },
    contents: {
      create: [
        ...(new Array(30).fill(1).map(() => (
          {
            contentType: 'File',
            name: faker.word.conjunction(10),
            path: faker.image.url(),
            size: 0,
            icon: {
              create: {
                srcPath: faker.image.url(),
                name: faker.system.fileName(),
              }
            },
          })))
      ],
    },
    tags: {
      create: [
        ...(new Array(30).fill(1).map(() => ({
          tag: {
            create: {
              name: faker.word.noun(),
              color: faker.color.rgb(),
            }
          }
        })))
      ]
    }
  },
  {
    id: 'example-project2',
    title: faker.company.name(),
    icon: {
      create: {
        srcPath: faker.image.url(),
        name: faker.system.fileName(),
      }
    },
    contents: {
      create: [
        ...(new Array(30).fill(1).map(() => (
          {
            contentType: 'File',
            name: faker.word.conjunction(10),
            path: faker.image.url(),
            size: 0,
            icon: {
              create: {
                srcPath: faker.image.url(),
                name: faker.system.fileName(),
              }
            },
          })))
      ],
    },
    tags: {
      create: [
        ...(new Array(30).fill(1).map(() => ({
          tag: {
            create: {
              name: faker.word.noun(),
              color: faker.color.rgb(),
            }
          }
        })))
      ]
    }
  },
  {
    id: 'example-project3',
    title: faker.company.name(),
    icon: {
      create: {
        srcPath: faker.image.url(),
        name: faker.system.fileName(),
      }
    },
    contents: {
      create: [
        ...(new Array(30).fill(1).map(() => (
          {
            contentType: 'File',
            name: faker.word.conjunction(10),
            path: faker.image.url(),
            size: 0,
            icon: {
              create: {
                srcPath: faker.image.url(),
                name: faker.system.fileName(),
              }
            },
          })))
      ],
    },
    tags: {
      create: [
        ...(new Array(30).fill(1).map(() => ({
          tag: {
            create: {
              name: faker.word.noun(),
              color: faker.color.rgb(),
            }
          }
        })))
      ]
    }
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of Project) {
    const project = await prisma.project.create({
      data: u,
    })
    console.log(`Created user with id: ${project.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })