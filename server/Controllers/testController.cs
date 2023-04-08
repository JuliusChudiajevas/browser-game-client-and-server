using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json;

namespace server.Controllers
{
    public class Entity
    {
        public string id { get; set; }
        public string type { get; set; }
        public float x { get; set; }
        public float y { get; set; }
    }
    public static class EntityList
    {
        public static Dictionary<string, Entity> entities = new Dictionary<string, Entity>();
        public static void update(Entity e)
        {
            if (!entities.ContainsKey(e.id))
            {
                entities.Add(e.id, e);
            }

            entities[e.id].x = e.x;
            entities[e.id].y = e.y;
        }
    }
    public static class Ids
    {
        public static Queue<int> ids = new Queue<int>();
    }

    [Route("")]
    [ApiController]
    public class dataController : ControllerBase
    {
        [Route("{*fileName:regex(^*[[.]]{{1}}.*$)}")]
        [HttpGet]
        public ActionResult getFile(string fileName)
        {
            string pathToClientFile = $"YOURPATH/{fileName}";

            try
            {
                if (fileName == null)
                {
                    fileName = "index.html";
                }
                var pr = new FileExtensionContentTypeProvider();
                string type;
                byte[] fileBytes;
                pr.TryGetContentType(fileName, out type);
                fileBytes = System.IO.File.ReadAllBytes(pathToClientFile);
                return File(fileBytes, type);
            }
            catch (System.Exception)
            {
                return Ok("aaaaaaaaaaaaaaaa");
            }
        }

        [Route("data/onConnect")]
        [HttpGet]
        public IActionResult id()
        {
            // if (Ids.ids.Count > 4)
            // {
            //     return Ok(-1);
            // }
            int id = Ids.ids.Count;
            Ids.ids.Enqueue(Ids.ids.Count);

            return Ok(id);
        }

        [Route("data/onDisconnect")]
        [HttpPost]
        public IActionResult disconnect(Entity data)
        {
            EntityList.entities.Remove(data.id);
            return Ok();
        }

        [Route("data")]
        [HttpGet]
        public IActionResult getData()
        {
            var data = JsonConvert.SerializeObject(EntityList.entities.Values);
            return Ok(data);
        }

        [Route("data")]
        [HttpPost]
        public IActionResult postData(Entity data)
        {
            EntityList.update(data);
            return Ok("probably updated");
        }
    }
}