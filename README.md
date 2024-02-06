# Chacurbanos-back

## Contents

<ol>
  <li>
    <a href="#about">About</a>
    <ul>
      <li><a href="#technologies">Technologies</a></li>
    </ul>
  </li>
  <li><a href="#gitflow-and-semver">Gitflow and semver</a></li>
  <li>
    <a href="#installation">Installation</a>
  </li>
  <li><a href="#functionalities">Functionalities</a></li>
  <li><a href="#contact">Contact</a></li>
</ol>

## About

`Chacurbanos-back` is a project for the acceleration stage of the Plataforma 5 Bootcamp. The goal of this project is to create a last-mile logistic management platform that optimizes package distribution and the operational efficiency of delivery drivers. It allows delivery drivers to select and deliver up to 10 packages daily and administrators to monitor and manage deliveries in real-time.

## Technologies

This project uses the following technologies:
- **Frontend**: Next, Redux, Tailwind
- **Backend**: Node.js, NestJS
- **Base de Datos**: MongoDB

## Gitflow and semver

We use Gitflow as our version control workflow. You can find more information in our [GITFLOW.md](GITFLOW.md) file.

### Installation

To get `Chacurbanos-back` up and running, follow these steps:

```bash
# Clone this repository
git clone https://github.com/Tute22/Chacurbanos-back

# Enter the repository directory
cd Chacurbanos-back

# Install dependencies
npm install

# At the root, create a .env file containing the following:
MONGO_URI = your_mongo_URI

# Seed the database
npm run seed

# Start the application
npm start

# Dockerize
docker build -t chacurbanos-back .
docker-compose up --build

# Start the application with Docker
docker-compose up

#----------------------------------------------------------

# Run the tests
npm test
```

## Functionalities

- **For Administrators**:
    - Display of the list of couriers and their current status.
    - Real-time tracking of ongoing deliveries.
    - Management tools for creating, viewing, and editing packages.

- **For Couriers**:
    - Secure registration and login.
    - Selection of packages for daily delivery.
    - Intuitive interface for managing deliveries.

## Contact

If you have any questions or need more information, do not hesitate to contact us through [Contact Mail](mailto:fastdeliverychacurbanos@gmail.com).
---

## Developers

 <p>Agustín Sandoval:</p>
  <a href="mailto:agustinandressandoval1@gmail.com" target="_blank" rel="noopener noreferrer">
    <img alt="Gmail" title="gmail" src="https://custom-icon-badges.demolab.com/badge/-agustinandressandoval1@gmail.com-red?style=for-the-badge&logo=mention&logoColor=white"/></a>
  <a href="https://www.linkedin.com/in/agustin-andres-sandoval/" target="_blank" rel="noopener noreferrer">
    <img alt="Linkedin" title="linkedin" src="https://custom-icon-badges.demolab.com/badge/-Linkedin-blue?style=for-the-badge&logoColor=white&logo=linkedin"/></a>

 <p>Fiama Talavera:</p>
  <a href="mailto:fiama.viccini@gmail.com" target="_blank" rel="noopener noreferrer">
    <img alt="Gmail" title="gmail" src="https://custom-icon-badges.demolab.com/badge/-fiama.viccini@gmail.com-red?style=for-the-badge&logo=mention&logoColor=white"/></a>
  <a href="https://www.linkedin.com/in/fiama-talavera-viccini/" target="_blank" rel="noopener noreferrer">
    <img alt="Linkedin" title="linkedin" src="https://custom-icon-badges.demolab.com/badge/-Linkedin-blue?style=for-the-badge&logoColor=white&logo=linkedin"/></a>

 <p>Gastón Rabinovich:</p>
  <a href="mailto:garabinovich@gmail.com" target="_blank" rel="noopener noreferrer">
    <img alt="Gmail" title="gmail" src="https://custom-icon-badges.demolab.com/badge/-garabinovich@gmail.com-red?style=for-the-badge&logo=mention&logoColor=white"/></a>
  <a href="https://www.linkedin.com/in/gast%C3%B3n-ariel-rabinovich-276711283/" target="_blank" rel="noopener noreferrer">
    <img alt="Linkedin" title="linkedin" src="https://custom-icon-badges.demolab.com/badge/-Linkedin-blue?style=for-the-badge&logoColor=white&logo=linkedin"/></a>

 <p>Isidro Molina:</p>
  <a href="mailto:isidromolina260@gmail.com" target="_blank" rel="noopener noreferrer">
    <img alt="Gmail" title="gmail" src="https://custom-icon-badges.demolab.com/badge/-isidromolina260@gmail.com-red?style=for-the-badge&logo=mention&logoColor=white"/></a>
  <a href="https://www.linkedin.com/in/isidro-molina/" target="_blank" rel="noopener noreferrer">
    <img alt="Linkedin" title="linkedin" src="https://custom-icon-badges.demolab.com/badge/-Linkedin-blue?style=for-the-badge&logoColor=white&logo=linkedin"/></a>

 <p>Martín Ferrando:</p>
  <a href="mailto:ferrandomartin6@gmail.com" target="_blank" rel="noopener noreferrer">
    <img alt="Gmail" title="gmail" src="https://custom-icon-badges.demolab.com/badge/-ferrandomartin6@gmail.com-red?style=for-the-badge&logo=mention&logoColor=white"/></a>
  <a href="https://www.linkedin.com/in/martín-ferrando-152594276/" target="_blank" rel="noopener noreferrer">
    <img alt="Linkedin" title="linkedin" src="https://custom-icon-badges.demolab.com/badge/-Linkedin-blue?style=for-the-badge&logoColor=white&logo=linkedin"/></a>

© [Chacurbanos], [2023]. All rights reserved.