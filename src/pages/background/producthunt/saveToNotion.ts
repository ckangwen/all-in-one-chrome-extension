/* eslint-disable no-underscore-dangle */
import { Client } from "@notionhq/client";
import { tryJsonParse } from "@/libs/utils";
import config from "@/config";

const notion = new Client({
  auth: config.NOTION_KEY,
});

async function createPage(
  databaseId: string,
  properties: {
    name: string;
    description: string;
    tagline: string;
    tags?: string[];
    url: string;
    paragraph: string;
    images?: string[];
  },
) {
  const { name, description, tagline, tags = [], url, paragraph, images = [] } = properties;
  try {
    await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: databaseId,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Tagline: {
          type: "rich_text",
          rich_text: [
            {
              text: {
                content: tagline,
              },
            },
          ],
        },
        Description: {
          type: "rich_text",
          rich_text: [
            {
              text: {
                content: description,
              },
            },
          ],
        },
        Tags: {
          type: "multi_select",
          multi_select: tags.map((tag) => {
            return { name: tag };
          }),
        },
        URL: {
          type: "url",
          url,
        },
      },
      children: [
        {
          paragraph: {
            rich_text: [
              {
                text: {
                  content: paragraph,
                },
              },
            ],
            children: images.map((t) => {
              return {
                type: "image",
                image: {
                  external: {
                    url: t,
                  },
                },
              };
            }),
          },
        },
      ],
    });

    return true;
  } catch (e) {
    return false;
  }
}

function formatProductHuntData(metaData: any) {
  const slug = metaData?.query?.slug;
  const apolloState = metaData?.props?.apolloState;
  if (!slug || !apolloState) return {};

  // eslint-disable-next-line no-underscore-dangle
  const postId = apolloState.ROOT_QUERY[`post({"slug":"${slug}"})`].__ref;
  const post = apolloState[postId];
  const { name, tagline, description } = post;
  const topicKey = Object.keys(post).find((t) => t.startsWith("topics("));
  const topics = (post[topicKey]?.edges || []).map((t) => {
    const topicId = t.node.__ref;
    const topic = apolloState[topicId];
    return topic.name;
  });
  const screenshots = post.structuredData.screenshot;

  return {
    postId,
    name,
    tagline,
    description,
    topics,
    screenshots,
  };
}

export async function saveToNotion(url: string, productMetaData: any) {
  const { name, tagline, description, topics, screenshots } = formatProductHuntData(
    tryJsonParse(productMetaData) || {},
  );
  if (!name) return;

  await createPage("5f5ba1cb0f0044fda2f416a8133835eb", {
    name,
    description,
    tagline,
    tags: topics,
    url,
    paragraph: description,
    images: screenshots,
  });
}
