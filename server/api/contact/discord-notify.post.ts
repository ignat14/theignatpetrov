import type { ContactForm } from '~/types/contact'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  
  if (!config.discordWebhookUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Discord webhook URL not configured'
    })
  }
  
  try {
    const formData: ContactForm = body
    
    // Create Discord embed message
    const discordMessage = {
      content: config.discordUserId ? `<@${config.discordUserId}>` : undefined,
      embeds: [
        {
          title: "📧 New Contact Form Submission",
          color: 0x00ff00, // Green color
          fields: [
            {
              name: "👤 Name",
              value: `${formData.firstName} ${formData.lastName}`,
              inline: true
            },
            {
              name: "📧 Email",
              value: formData.email,
              inline: true
            },
            {
              name: "🏢 Company",
              value: formData.company || "Not provided",
              inline: true
            },
            {
              name: "📋 Subject",
              value: formData.subject,
              inline: false
            },
            {
              name: "💬 Message",
              value: formData.message.length > 1000 
                ? formData.message.substring(0, 1000) + "..." 
                : formData.message,
              inline: false
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Contact Form • ignatpetrov.com"
          }
        }
      ]
    }
    
    // Send to Discord
    const response = await fetch(config.discordWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordMessage)
    })
    
    if (!response.ok) {
      throw new Error(`Discord API error: ${response.status}`)
    }
    
    return { success: true, message: 'Discord notification sent' }
    
  } catch (error) {
    console.error('Discord notification error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send Discord notification'
    })
  }
})