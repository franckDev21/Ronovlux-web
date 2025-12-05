const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing API endpoints...\n');
    
    // Test services endpoint
    console.log('1. Testing /api/services:');
    const servicesRes = await fetch('http://127.0.0.1:8000/api/services');
    const servicesData = await servicesRes.json();
    console.log('Status:', servicesRes.status);
    console.log('Data structure:', Object.keys(servicesData));
    console.log('Has data array?', 'data' in servicesData);
    console.log('Number of services:', servicesData.data?.length || 0);
    if (servicesData.data && servicesData.data.length > 0) {
      console.log('First service:', {
        id: servicesData.data[0].id,
        name: servicesData.data[0].name,
        titleField: servicesData.data[0].title, // Should be undefined
        is_active: servicesData.data[0].is_active
      });
    }
    
    console.log('\n2. Testing /api/projects:');
    const projectsRes = await fetch('http://127.0.0.1:8000/api/projects');
    const projectsData = await projectsRes.json();
    console.log('Status:', projectsRes.status);
    console.log('Data structure:', Object.keys(projectsData));
    console.log('Has data array?', 'data' in projectsData);
    console.log('Number of projects:', projectsData.data?.length || 0);
    if (projectsData.data && projectsData.data.length > 0) {
      console.log('First project:', {
        id: projectsData.data[0].id,
        title: projectsData.data[0].title,
        category: projectsData.data[0].category,
        description: projectsData.data[0].description
      });
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();